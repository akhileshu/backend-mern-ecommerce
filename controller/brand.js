const { Brand } = require("../model/brand");

exports.fetchBrands = async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching brands' });
    }
  };
exports.createBrand = async (req, res) => {
    try {
      const brand = new Brand(req.body)
      await brand.save();
      res.status(200).json(brand);
    } catch (error) {
      res.status(400).json({ error: 'Error creating brand' });
    }
  };