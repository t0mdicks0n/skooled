console.log('The address to the database is: ', process.env.DATABASE_URL);

module.exports = {
  client: 'pg',
  debug: true,
  connection: process.env.DATABASE_URL,
  ssl:true
}

// The old one that works for our development machines
// module.exports = {
//   client: 'pg',
//   debug: true,
//   connection: {
//   host     : process.env.PG_HOST || 'localhost',
//   user     : process.env.PG_USER || 'root',
//   password : process.env.PG_PASSWORD || '',
//   database : process.env.PG_DB || 'test',
//   charset  : 'utf8'
//   },
// }