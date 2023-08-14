const { Category } = require("../model/category");

exports.fetchCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching categories' });
    }
  };
  exports.createCategory = async (req, res) => {
    try {
      const category = new Category(req.body)
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: 'Error creating category' });
    }
  };