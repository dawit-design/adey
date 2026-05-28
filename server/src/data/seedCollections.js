const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Collection = require("../models/Collection");
const Place = require("../models/Place");
const slugify = require("../utils/slugify");

dotenv.config();

const rawCollections = [
  {
    title: "First Time in Ethiopia",
    subtitle: "A beautiful introduction to Ethiopia’s history, culture, and landscapes.",
    description:
      "Start with Ethiopia’s most iconic places: museums, heritage cities, sacred sites, lakes, and mountain landscapes. This collection is ideal for first-time visitors, diaspora travelers, and anyone who wants a strong introduction to the country.",
    estimatedDuration: "7-10 days",
    difficultyLevel: "moderate",
    featured: true,
    order: 1,
    audience: ["foreigner", "diaspora", "local"],
    tags: ["first-time", "heritage", "culture", "history"],
    placeSlugs: [
      "the-national-museum-of-ethiopia",
      "unity-park",
      "lalibela-rock-hewn-churches",
      "gondar",
      "lake-tana",
      "simien-mountains-national-park",
      "harar-jugol",
    ],
  },

  {
    title: "Northern Historic Route",
    subtitle: "Ethiopia’s iconic heritage journey through the historic north.",
    description:
      "Follow Ethiopia’s historic northern route through ancient kingdoms, castles, monasteries, rock-hewn churches, mountain landscapes, and sacred heritage sites.",
    estimatedDuration: "7-10 days",
    difficultyLevel: "moderate",
    featured: true,
    order: 2,
    audience: ["foreigner", "diaspora", "local"],
    tags: ["history", "heritage", "unesco", "northern-route"],
    placeSlugs: [
      "aksum",
      "lalibela-rock-hewn-churches",
      "gondar",
      "lake-tana",
      "simien-mountains-national-park",
      "gheralta-mountains",
      "debre-damo-monastery",
      "adwa",
    ],
  },

  {
    title: "Weekend Escapes from Addis",
    subtitle: "Short trips, nature escapes, resorts, and easy getaways near Addis Ababa.",
    description:
      "A curated set of places for locals, expats, and visitors looking for quick escapes from Addis Ababa. Perfect for weekends, family outings, short nature trips, and relaxed resort stays.",
    estimatedDuration: "Half day to 2 days",
    difficultyLevel: "easy",
    featured: true,
    order: 3,
    audience: ["local", "family", "couple", "foreigner"],
    tags: ["weekend", "addis-escape", "family", "short-trip"],
    placeSlugs: [
      "bishoftu",
      "wenchi-crater-lake",
      "debre-libanos",
      "menagesha-suba-forest",
      "kuriftu-resort-entoto",
      "kuriftu-resort-bishoftu",
      "friendship-park",
      "unity-park",
    ],
  },

  {
    title: "Coffee Origins Journey",
    subtitle: "Explore Ethiopia’s coffee landscapes, forests, and cultural roots.",
    description:
      "Discover Ethiopia through coffee: forests, cultural landscapes, cities, and communities connected to the origin and heritage of Arabica coffee.",
    estimatedDuration: "3-6 days",
    difficultyLevel: "moderate",
    featured: true,
    order: 4,
    audience: ["foreigner", "diaspora", "local"],
    tags: ["coffee", "culture", "nature", "origin"],
    placeSlugs: [
      "kafa-biosphere-reserve",
      "jimma",
      "gedeo-cultural-landscape",
    ],
  },

  {
    title: "Wild Ethiopia",
    subtitle: "National parks, wildlife, mountains, forests, and remote landscapes.",
    description:
      "Explore Ethiopia’s wild side through national parks, highland ecosystems, rare wildlife, forests, lakes, and remote wilderness destinations.",
    estimatedDuration: "5-10 days",
    difficultyLevel: "hard",
    featured: true,
    order: 5,
    audience: ["adventure", "foreigner", "local"],
    tags: ["wildlife", "nature", "parks", "adventure"],
    placeSlugs: [
      "simien-mountains-national-park",
      "bale-mountains-national-park",
      "arbaminch-and-nech-sar-national-park",
      "gambella-national-park",
      "babile-elephant-sanctuary",
      "the-omo-national-park",
    ],
  },

  {
    title: "Spiritual Ethiopia",
    subtitle: "Sacred churches, monasteries, mosques, and pilgrimage places.",
    description:
      "A journey through Ethiopia’s spiritual heritage, including ancient churches, monasteries, Islamic heritage sites, pilgrimage areas, and sacred landscapes.",
    estimatedDuration: "5-8 days",
    difficultyLevel: "moderate",
    featured: true,
    order: 6,
    audience: ["diaspora", "foreigner", "local"],
    tags: ["religious", "spiritual", "pilgrimage", "heritage"],
    placeSlugs: [
      "lalibela-rock-hewn-churches",
      "debre-libanos",
      "debre-damo-monastery",
      "al-nejash",
      "hayk-estifanos-monastery",
      "lake-tana",
    ],
  },

  {
    title: "Hidden Gems",
    subtitle: "Less obvious places with strong discovery value.",
    description:
      "Go beyond the obvious and explore Ethiopia’s less crowded destinations, community tourism places, caves, highland routes, and emerging experiences.",
    estimatedDuration: "3-7 days",
    difficultyLevel: "moderate",
    featured: true,
    order: 7,
    audience: ["local", "diaspora", "adventure"],
    tags: ["hidden-gem", "community-tourism", "discovery"],
    placeSlugs: [
      "menz-guassa",
      "ankober",
      "shonke-village",
      "lephis-ecotourism-village",
      "sof-omar-cave",
      "choke-mountains-ecovillage",
    ],
  },

  {
    title: "New Ethiopia",
    subtitle: "New parks, memorials, resorts, and modern tourism developments.",
    description:
      "Explore Ethiopia’s newer tourism experiences, including modern parks, memorials, eco-resorts, public-private tourism projects, and new leisure destinations.",
    estimatedDuration: "3-6 days",
    difficultyLevel: "easy",
    featured: true,
    order: 8,
    audience: ["diaspora", "local", "foreigner", "family"],
    tags: ["new", "modern", "resort", "urban-tourism"],
    placeSlugs: [
      "unity-park",
      "friendship-park",
      "adwa-victory-memorial",
      "gorgora-eco-resort",
      "wonchi-eco-lodge",
      "halala-kella-resort",
      "kuriftu-resort-entoto",
    ],
  },
];

const seedCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Collection.deleteMany({});
    console.log("Existing collections deleted");

    for (const rawCollection of rawCollections) {
      const places = await Place.find({
        slug: { $in: rawCollection.placeSlugs },
      });

      const foundSlugs = places.map((place) => place.slug);
      const missingSlugs = rawCollection.placeSlugs.filter(
        (slug) => !foundSlugs.includes(slug)
      );

      if (missingSlugs.length > 0) {
        console.log(
          `Missing places for "${rawCollection.title}":`,
          missingSlugs
        );
      }

      await Collection.create({
        title: rawCollection.title,
        slug: slugify(rawCollection.title),
        subtitle: rawCollection.subtitle,
        description: rawCollection.description,
        estimatedDuration: rawCollection.estimatedDuration,
        difficultyLevel: rawCollection.difficultyLevel,
        featured: rawCollection.featured,
        order: rawCollection.order,
        audience: rawCollection.audience,
        tags: rawCollection.tags,
        places: places.map((place) => place._id),
        status: "published",
      });

      console.log(`Created collection: ${rawCollection.title}`);
    }

    console.log("Collections seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Failed to seed collections:", error.message);
    process.exit(1);
  }
};

seedCollections();