const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
       dialect: 'postgres',
       host: process.env.DB_HOST
   }
)
// module.exports = new Sequelize(
//     'NewsPortal',
//     'postgres',
//     '12345678',
//     {
//         dialect: 'postgres',
//         host: 'localhost',
//         port: 5432
//     }
// )
