const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const Item = require('../../models/item');

describe('Server path: /items/:id/:delete', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('ROUTES: POST', () => {
    it('create and delete an item', async () => {
      var item = await seedItemToDatabase();
      var itemId = item._id;

      //exercise
      const response = await request(app)
      .post('/items/' + itemId + '/delete');

      //verify (if item title isn't present, it is assumed item is deleted)
      assert.notInclude(parseTextFromHTML(response.text, 'body'), item.title);
    });
  });
});
