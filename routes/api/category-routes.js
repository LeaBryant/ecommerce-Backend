const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // finds all categories
    const categoryData = await Category.findAll({
      // includes its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // finds one category by its `id` value
  try {
    // includes its associated Products
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found" });
      return;
    }

    res.status(200).json(categoryData);
    } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json({ message: "Category successfully created!"});
  } catch (err) {
    res.status(400).json({ message: "Error creating category."});
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Your category has been updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy( {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json({ message: "Category has been deleted!"});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
