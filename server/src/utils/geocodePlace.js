const GEOCODING_URL =
  process.env.GEOCODING_URL ||
  "https://nominatim.openstreetmap.org/search";

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const cleanText = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\s+/g, " ")
    .trim();
};

const createUserAgent = () => {
  const contactEmail =
    process.env.GEOCODING_EMAIL ||
    "admin@adeytravel.com";

  return `ADEY-Travel-App/1.0 (${contactEmail})`;
};

const hasValidCoordinates = (
  location
) => {
  const coordinates =
    location?.coordinates;

  if (
    !Array.isArray(coordinates) ||
    coordinates.length !== 2
  ) {
    return false;
  }

  const longitude =
    Number(coordinates[0]);

  const latitude =
    Number(coordinates[1]);

  if (
    !Number.isFinite(longitude) ||
    !Number.isFinite(latitude)
  ) {
    return false;
  }

  if (
    longitude === 0 &&
    latitude === 0
  ) {
    return false;
  }

  return (
    longitude >= 32 &&
    longitude <= 48 &&
    latitude >= 2.5 &&
    latitude <= 15.5
  );
};

const simplifyDestinationName = (
  value
) => {
  let name = cleanText(value);

  if (!name) {
    return "";
  }

  const removablePhrases = [
    /\brock[\s-]*hewn churches?\b/gi,
    /\bchurches? of\b/gi,
    /\bnational park\b/gi,
    /\bwildlife sanctuary\b/gi,
    /\bwildlife reserve\b/gi,
    /\bnature reserve\b/gi,
    /\bcultural center\b/gi,
    /\bcultural centre\b/gi,
    /\bhistorical site\b/gi,
    /\barchaeological site\b/gi,
    /\bheritage site\b/gi,
    /\bhot springs?\b/gi,
    /\bwaterfalls?\b/gi,
    /\bfalls\b/gi,
    /\bmountains?\b/gi,
    /\bmount\b/gi,
    /\blakes?\b/gi,
    /\bmuseums?\b/gi,
    /\bmonaster(?:y|ies)\b/gi,
    /\bchurches?\b/gi,
    /\bpalaces?\b/gi,
    /\bcastles?\b/gi,
    /\bresorts?\b/gi,
    /\blodges?\b/gi,
    /\bhotels?\b/gi,
    /\brestaurants?\b/gi,
    /\bcafes?\b/gi,
    /\bexperiences?\b/gi,
  ];

  removablePhrases.forEach(
    (pattern) => {
      name = name.replace(
        pattern,
        " "
      );
    }
  );

  return name
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^[,\-\s]+/, "")
    .replace(/[,\-\s]+$/, "")
    .trim();
};

const addSearchQuery = (
  queries,
  parts,
  matchType
) => {
  const query = parts
    .map(cleanText)
    .filter(Boolean)
    .join(", ");

  if (!query) {
    return;
  }

  const alreadyExists =
    queries.some(
      (item) =>
        item.query.toLowerCase() ===
        query.toLowerCase()
    );

  if (!alreadyExists) {
    queries.push({
      query,
      matchType,
    });
  }
};

const buildSearchQueries = (place) => {
  const name =
    cleanText(place?.name);

  const simplifiedName =
    simplifyDestinationName(name);

  const city =
    cleanText(place?.city);

  const area =
    cleanText(place?.area);

  const region =
    cleanText(place?.region);

  const nearestTown =
    cleanText(
      place?.nearestTown
    );

  const country =
    cleanText(place?.country) ||
    "Ethiopia";

  const queries = [];

  /*
    First: try to find the exact destination.
  */
  addSearchQuery(
    queries,
    [
      name,
      city,
      region,
      country,
    ],
    "exact"
  );

  addSearchQuery(
    queries,
    [
      name,
      area,
      region,
      country,
    ],
    "exact"
  );

  addSearchQuery(
    queries,
    [
      name,
      region,
      country,
    ],
    "exact"
  );

  addSearchQuery(
    queries,
    [
      name,
      country,
    ],
    "exact"
  );

  /*
    Second: remove generic destination terms.

    Example:
    "Lalibela Rock-Hewn Churches"
    becomes:
    "Lalibela"
  */
  if (
    simplifiedName &&
    simplifiedName.toLowerCase() !==
      name.toLowerCase()
  ) {
    addSearchQuery(
      queries,
      [
        simplifiedName,
        city,
        region,
        country,
      ],
      "simplified"
    );

    addSearchQuery(
      queries,
      [
        simplifiedName,
        region,
        country,
      ],
      "simplified"
    );

    addSearchQuery(
      queries,
      [
        simplifiedName,
        country,
      ],
      "simplified"
    );
  }

  /*
    Third: use the destination's locality.

    This is suitable for the Passport overview
    map when an exact landmark is unavailable.
  */
  addSearchQuery(
    queries,
    [
      city,
      region,
      country,
    ],
    "locality"
  );

  addSearchQuery(
    queries,
    [
      area,
      region,
      country,
    ],
    "locality"
  );

  addSearchQuery(
    queries,
    [
      nearestTown,
      region,
      country,
    ],
    "locality"
  );

  addSearchQuery(
    queries,
    [
      city,
      country,
    ],
    "locality"
  );

  addSearchQuery(
    queries,
    [
      nearestTown,
      country,
    ],
    "locality"
  );

  return queries;
};

const searchCoordinates = async (
  searchItem
) => {
  if (typeof fetch !== "function") {
    throw new Error(
      "Automatic geocoding requires Node.js 18 or newer."
    );
  }

  const searchParams =
    new URLSearchParams({
      q: searchItem.query,
      format: "jsonv2",
      limit: "3",
      countrycodes: "et",
      addressdetails: "1",
      namedetails: "1",
      "accept-language": "en",
    });

  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(
      `${GEOCODING_URL}?${searchParams.toString()}`,
      {
        method: "GET",

        headers: {
          "User-Agent":
            createUserAgent(),

          Accept:
            "application/json",

          "Accept-Language":
            "en",
        },

        signal:
          controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Geocoding request failed with status ${response.status}.`
      );
    }

    const results =
      await response.json();

    if (
      !Array.isArray(results) ||
      results.length === 0
    ) {
      return null;
    }

    for (const result of results) {
      const longitude =
        Number(result.lon);

      const latitude =
        Number(result.lat);

      const location = {
        type: "Point",
        coordinates: [
          longitude,
          latitude,
        ],
      };

      if (
        hasValidCoordinates(
          location
        )
      ) {
        return {
          location,

          matchedName:
            result.display_name ||
            searchItem.query,

          searchQuery:
            searchItem.query,

          matchType:
            searchItem.matchType,

          resultType:
            result.type || "",

          resultCategory:
            result.category || "",
        };
      }
    }

    return null;
  } catch (error) {
    if (
      error.name === "AbortError"
    ) {
      throw new Error(
        "The geocoding request timed out."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
};

const geocodePlace = async (
  place
) => {
  if (!place?.name) {
    return null;
  }

  const queries =
    buildSearchQueries(place);

  for (
    let index = 0;
    index < queries.length;
    index += 1
  ) {
    if (index > 0) {
      /*
        Public Nominatim allows a maximum
        of one request per second.
      */
      await wait(1100);
    }

    const result =
      await searchCoordinates(
        queries[index]
      );

    if (result) {
      return result;
    }
  }

  return null;
};

module.exports = {
  geocodePlace,
  hasValidCoordinates,
  simplifyDestinationName,
  wait,
};