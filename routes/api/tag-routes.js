const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // finds all tags
    const tagData = await Tag.findAll( {
      // includes its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagData);  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // finds  a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // includes its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json({ message: "Tag successfully created!"});
  } catch (err) {
    res.status(500).json({ message: "Error creating new tag."});
  }
});

router.put('/:id', async (req, res) => {
  try{
    // update a tag's name by its `id` value
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Your tag has been updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy( {
    where: {
      id: req.params.id,
    },
  });
  if (!tagData) {
    res.status(404).json({ message: "No tag with this id!" });
    return;
  }
  res.status(200).json({ message: "Tag has been deleted!"});
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
