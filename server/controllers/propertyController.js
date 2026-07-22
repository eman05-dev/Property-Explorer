const Property = require('../models/Property');

// GET /api/properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    return res.status(200).json(properties);
  } catch (err) {
    console.error('[getProperties]', err.message);
    return res.status(500).json({ message: 'Failed to fetch properties' });
  }
};

// GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    return res.status(200).json(property);
  } catch (err) {
    console.error('[getPropertyById]', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid property id' });
    }
    return res.status(500).json({ message: 'Failed to fetch property' });
  }
};

// POST /api/properties
const createProperty = async (req, res) => {
  try {
    const { title, price, latitude, longitude, imageUrl } = req.body;

    if (!title || price === undefined || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: 'title, price, latitude, and longitude are required',
      });
    }

    const numericPrice = Number(price);
    const numericLat = Number(latitude);
    const numericLng = Number(longitude);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'price must be a non-negative number' });
    }
    if (Number.isNaN(numericLat) || numericLat < -90 || numericLat > 90) {
      return res.status(400).json({ message: 'latitude must be between -90 and 90' });
    }
    if (Number.isNaN(numericLng) || numericLng < -180 || numericLng > 180) {
      return res.status(400).json({ message: 'longitude must be between -180 and 180' });
    }

    const property = await Property.create({
      title: title.trim(),
      price: numericPrice,
      latitude: numericLat,
      longitude: numericLng,
      imageUrl: imageUrl || '',
    });

    return res.status(201).json(property);
  } catch (err) {
    console.error('[createProperty]', err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Failed to create property' });
  }
};

// PATCH /api/properties/:id/book
const bookProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { booked: true },
      { new: true, runValidators: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    return res.status(200).json(property);
  } catch (err) {
    console.error('[bookProperty]', err.message);
    return res.status(500).json({ message: 'Failed to book property' });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  bookProperty,
};
