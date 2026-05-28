const Place = require("../models/Place");
const slugify = require("../utils/slugify");

exports.createPlace = async (req, res) => {
  try {
    const slug = req.body.slug || slugify(req.body.name);

    const place = await Place.create({
      ...req.body,
      slug,
    });

    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const { type, category, region, featured, q } = req.query;

    const filter = { status: "published" };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (region) filter.region = new RegExp(region, "i");
    if (featured) filter.featured = featured === "true";

    if (q) {
      filter.$text = { $search: q };
    }

    const places = await Place.find(filter).sort({ featured: -1, createdAt: -1 });

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlaceBySlug = async (req, res) => {
  try {
    const place = await Place.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    if (req.body.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    }

    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};