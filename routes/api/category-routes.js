const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include:[Product],
  })
  // be sure to include its associated Products
  .then((categories) => res.json(categories))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne(req.params.id, {
    include: [Product],
  // be sure to include its associated Products
  }).then((category) => res.json(category))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => res.json(category))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {id: req.params.id },
    }) .then((updatedCategory) => res.json(updatedCategory))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id }
})
    .then((category) => {
    res.json({ message: "Category " + req.params.id + " has been deleted." });
    if (!category) {
    res.status(404).json({ message: "No category found!" });
    return;
  }
  res.json(category);
});
});

module.exports = router;
