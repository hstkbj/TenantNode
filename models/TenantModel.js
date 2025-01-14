module.exports = (sequelize, DataTypes)=>{
    const Tenant = sequelize.define('Tenant',{
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        database: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Tenant
}