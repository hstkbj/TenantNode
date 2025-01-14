const { Sequelize,DataTypes } = require('sequelize')
require('dotenv').config()



const getTenantDB = async (tenantDbName)=>{
   
        const sequelizeTenant = new Sequelize(tenantDbName, process.env.USER, process.env.PASSWORD,{
            host: process.env.HOST,
            dialect:'mysql',
            port: process.env.DB_PORT || 3306,
            pool: {
                max: 10, // Nombre maximum de connexions
                min: 0,  // Nombre minimum de connexions
                acquire: 30000, // Temps d'attente avant d'abandonner une tentative de connexion
                idle: 10000, // Temps maximum qu'une connexion peut rester inactive avant d'être fermée
            },
        })

        await sequelizeTenant.authenticate()
        console.log(`Connected to tenant DB: ${tenantDbName}`)

        const dbTenant = {}
        dbTenant.Sequelize = Sequelize
        dbTenant.sequelizeTenant = sequelizeTenant
        dbTenant.users = require('../models/UserModel')(sequelizeTenant, DataTypes)

        await dbTenant.sequelizeTenant.sync({force:false})
        .then(()=>{
            console.log('yes re-sync Tenant done!')
        })
    
        return dbTenant;
}

module.exports = {getTenantDB}