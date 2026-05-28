const Collection = require("../models/Collection");
const slugify = require("../utils/slugify");

exports.createCollection = async (req, res) => {
  try {
    const slug = req.body.slug || slugify(req.body.title);

    const collection = await Collection.create({
      ...req.body,
      slug,
    });

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const { featured, audience, tag, q } = req.query;

    const filter = { status: "published" };

    if (featured) filter.featured = featured === "true";

    if (audience) {
      filter.audience = { $in: audience.split(",") };
    }

    if (tag) {
      filter.tags = { $in: tag.split(",") };
    }

    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { subtitle: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { tags: new RegExp(q, "i") },
      ];
    }

    const collections = await Collection.find(filter)
      .populate("places")
      .sort({
        order: 1,
        featured: -1,
        createdAt: -1,
      });

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCollectionBySlug = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("places");

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title);
    }

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("places");

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};