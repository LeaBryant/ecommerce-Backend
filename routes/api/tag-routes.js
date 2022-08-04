const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll(req.params.id,
  // be sure to include its associated Product data
  {include: [{ model: Product, through: ProductTag }]
}).then((response) => res.json(response))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne(req.params.id,
    {
      include: [{ model: Product, through: ProductTag }]
    })
    .then((response) => res.json(response))
  });  
  // be sure to include its associated Product data


router.post('/', (req, res) => {
  // create a new tagTag.create(req.body)
  Tag.create(req.body)
  .then((tag) => res.json(tag))
  .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  }).then((response) => res.json(response))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tag) => {
    res.json({ message: "Tag " + req.params.id + " has been deleted." });
    if (!tag) {
      res.status(400).json({ message: "No tag found with that id." });
    }
  });
});

module.exports = router;
