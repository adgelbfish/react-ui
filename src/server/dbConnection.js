/* @flow */
// import Promise from 'bluebird';
import { MongoClient, ObjectId } from 'mongodb';
// 'mongodb://heroku_22dp56m3:igcadg5cng0t1hj9ofh8btqc7o@ds163397.mlab.com:63397/heroku_22dp56m3'
const MONGODB_URI = 'mongodb://heroku_22dp56m3:igcadg5cng0t1hj9ofh8btqc7o@ds163397.mlab.com:63397/heroku_22dp56m3'; //process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/local';

function addPrentQueryInfo(rows) {
  if (rows) {
    row._parentTypeInfo = this._parentTypeInfo ? this._parentTypeInfo : {};
    row._parentTypeInfo[Object.keys(this._parentTypeInfo).length + ''] = {root: this.root, type: this.type};
  }

  return row;
}
var mongoConnection = false;
MongoClient.connect(MONGODB_URI)
    .catch(err => console.error(err.stack))
    .then(db => {
      console.log('connected db');
      mongoConnection = db; // See http://expressjs.com/en/4x/api.html#app.locals
      // TODO: start server listen after mongo connection
    });

let dbConnection = {
  Query: {
    homepageCategories: (root, { sortBy, sortOrder, limit }, { connection }) => {
      console.log('homepageCategories', root);
      return mongoConnection.collection('categories').find({}).toArray();
    },
    channel: (root, { channelId }, { connection }) => {
      console.log('get channe;')
      return mongoConnection.collection('Channel').findOne({ $or: [ {uniqueId: channelId}, {slug: channelId} ] });
    }
  },
  Channel: {
    categories: (root, { sortBy, sortOrder, limit }, { connection }) => {
      console.log('categories', root);
      return mongoConnection.collection('categories').find({}).toArray();
    }
  },

  Category: {
    channels: (root, { sortBy, sortOrder, limit }, { connection }) => {
      console.log('channels', root);
      return mongoConnection.collection('Channel').find({categoryIds: ObjectId(root._id)}).limit(20).toArray();
    }

  },
};

export default dbConnection;