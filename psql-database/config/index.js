module.exports = {
  client: 'pg',
  debug: true,
  connection: {
  host     : process.env.PG_HOST || 'localhost',
  user     : process.env.PG_USER || 'root',
  password : process.env.PG_PASSWORD || '',
  database : process.env.PG_DB || 'test',
  charset  : 'utf8'
  }
}