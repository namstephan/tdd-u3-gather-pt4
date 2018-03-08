//test/routes/update-item-test.js

const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const Item = require('../../models/item');

describe('Server path: /items/:id/update', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('Confirms item to be updated is indeed on the page', async () => {

      const item = await seedItemToDatabase();
      const itemId = item._id;

      const response = await request(app)
        .get('/items/' + itemId + '/update');
      // verify
      const titleInput = jsdom(response.text).querySelector('#title-input');
      const imageUrlInput = jsdom(response.text).querySelector('#imageUrl-input');

      //assert.include(titleInput.value, item.title);
      //assert.include(imageUrlInput.value, item.imageUrl);
      assert.include(parseTextFromHTML(response.text, 'textarea#description-input'), item.description);
    });
  });
  describe('POST', () => {
    it('Updating an item after confirming its existance', async () => {

      const item = await seedItemToDatabase();
      const itemId = item._id;

      const title = 'My favorite item';
      const description = 'Just the best item';
      const imageUrl = 'http://placebear.com/g/200/300';

      const response = await request(app)
        .post('/items/' + itemId + '/update')
        .type('form')
        .send({title, description, imageUrl});

      const updatedItem = await Item.findOne({ _id:itemId });

      // verify
      assert.equal(updatedItem.title, title);
    });
  });
});
