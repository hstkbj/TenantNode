const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { getTenantDB } = require('../tenant/tenant.manager');
const { DataTypes } = require('sequelize');


const Tenant = db.tenant

const RegisterTenant = async (req,res) =>{
    const { name, email, password } = req.body;
    const dbName = `tenant_${Date.now()}`; // Nom de la base de données du Tenant
    const domain = `${name.replace(/\s/g, '').toLowerCase()}.localhost`; // Nom de domaine du Tenant

    try {
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un tenant dans master_db
        const tenant = await Tenant.create({
            name,
            email,
            database: dbName,
            domain: domain,
            password: hashedPassword
        })

        // Créer la base de données du tenant
        await db.sequelize.query(`CREATE DATABASE ${dbName}`)

        // Obtenir la connexion à la base du tenant
        await getTenantDB(dbName);
        

        

        res.status(201).send({ message: "Tenant created successfully!" });
    } catch (error) {
        console.error('Error creating tenant:', error);
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    RegisterTenant
}