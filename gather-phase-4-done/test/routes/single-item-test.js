const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('create an item using seedItemToDatabase()', () => {
    it('created item`s title and desc are in the requested HTML', async () => {
      var item = await seedItemToDatabase();
      var itemId = item._id;

      //exercise
      var response = await request(app)
      .get('/items/' + itemId);

      //verify
      assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
    });
  });
});
