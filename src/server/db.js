const pg = require('pg');
const url = require('url');

var configs;

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
} else {
  configs = {
    user: 'shwj',
    host: '127.0.0.1',
    database: 'shopping-react',
    port: 5432
  };
}

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
  console.log('idle client error', err.message, err.stack);
});

/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


const products = require('./models/products');

/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */
module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  products: products(pool),

  //make queries directly from here
  queryInterface: (text, params, callback) => {
    console.log('THEN IM HERE:???? AT DB???')
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool: pool

  /*
   * ADD APP MODELS HERE
   */
};