const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [{model: Product} ]
  })
  // be sure to include its associated Product data
.then((response) => { res.json(response)
})
.catch(err => {res.json(err)})
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {id: req.params.id},
    include: [ {model: Product}, ]
  }) 
  // be sure to include its associated Product data
  .then(productData => {res.json(productData)})
  .catch(err => {res.json(err)})
});

router.post('/', (req, res) => {
  // create a new tagTag.create(req.body)
  Tag.create(req.body)
  .then((tag) => { res.json(tag)})
  .catch(err => {res.json(err)})
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then((tagData) => {res.json(tagData)
  })
  .catch(err => {res.json(err)})
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id}
  })
  .then(tagData => {res.json(tagData)
  })
  .catch(err => {res.json(err)})
});

module.exports = router;
