module.exports = process.env.DATABASE_URL || {
  client: 'pg',
  connection: {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test',
  charset  : 'utf8'
  }
}