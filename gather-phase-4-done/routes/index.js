const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors)
  {
    res.status(400).render('create', {newItem: newItem});
  }
  else {
    await newItem.save();
    res.redirect('/');

  }
});

// handler for finding single item
router.get('/items/:itemId', async (req, res, next) => {
  const id = req.params.itemId;
  const item = await Item.findById(id);
  // The below commented method also works
  //const item = await Item.findOne({_id:id});
  res.render('items', {item});
});

// Step 4 Part 1: Handler for POST request to '/items/:itemId/delete'
router.post('/items/:itemId/delete', async (req, res, next) => {
  const id = req.params.itemId;
  const item = await Item.findById(id);
  await Item.deleteOne(item);
  res.redirect('/');
});

// Step 4 Part 2a: Handler for GET request to '/items/:itemId/update'
// Confirms item to be updated is indeed on the page
router.get('/items/:itemId/update', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('update', {item});
});

// Step 4 Part 2b: Handler for POST request to '/items/:itemId/update'
// Updating an item after confirming its existance
router.post('/items/:itemID/update', async (req, res, next) => {
  const {imageUrl, description, title} = await req.body;

  await Item.updateOne(
    {
      "_id":req.params.itemId
    },
    {
      $set:{"title":title, "description":description, "imageUrl":imageUrl}
    }
  );
  res.redirect('/');
});

module.exports = router;
