const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });
});
  // Write your tests below:
describe('Title', () => {
  it('Should be a string', () => {
    const titleAsNonString = 1;
    const item = new Item({title: titleAsNonString});

    assert.strictEqual(item.title, titleAsNonString.toString());
    });

  it('Title is required', () => {
    const item = new Item({title: ''});
    item.validateSync();
    assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });

describe('Description', () => {
  it('Should be a string', () => {
    const descAsNonString = 1;
    const item = new Item({description: descAsNonString});

    assert.strictEqual(item.description, descAsNonString.toString());
  });

  it('Description is required', () => {
    const item = new Item({description: ''});
    item.validateSync();
    assert.equal(item.errors.description.message, 'Path `description` is required.');
  });
});

describe('imageUrl', () => {
  it('Should be a string', () => {
    const imageUrlAsNonString = 1;
    const item = new Item({imageUrl: imageUrlAsNonString});

    assert.strictEqual(item.imageUrl, imageUrlAsNonString.toString());
  });

  it('imageUrl is required', () => {
    const item = new Item({imageUrl: ''});
    item.validateSync();
    assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
  });
});
