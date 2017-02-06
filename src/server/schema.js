import Schema from 'graph.ql';
import dbConnection from './dbConnection.js';
var schema = Schema(`
  type Channel {
    _id: String
    uniqueId: String
    channelNumber: Int
    title: String
    slug: String
    description: String
    thumb: String
    title: String
    categories: [Category]
    rating: Int
    age: String
    picture: String
    type: String
    embedCode: String
  }

  type Category {
    name: String
    channels: [Channel]
  }

  type Query {
    homepageCategories(sortBy: String, sortOrder: Boolean, limit: Int): [Category]
    channel(channelId: String): Channel
    channelSearch(query: String): [Channel]
    noop: String
  }
`, dbConnection);

export default schema.schema;