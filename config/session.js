const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

function createSessionStore() {
  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    collection: 'sessions',
    databaseName: 'online-shop',
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    }
  };
}

module.exports = createSessionConfig;
