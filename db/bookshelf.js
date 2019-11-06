const knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'nsq-db-cluster-instance-1.cfeublxda7lo.ap-southeast-1.rds.amazonaws.com',
      user: 'chatpify_uat',
      database: 'pg'
    }
  })
  const bookshelf = require('bookshelf')(knex)
  module.exports = bookshelf