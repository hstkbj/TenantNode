// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config()

// Exporter un objet contenant la configuration pour la connexion à la base de données
module.exports = {
    // Utiliser les variables d'environnement pour définir les informations de connexion
    HOST: process.env.HOST,          // L'hôte de la base de données, comme 'localhost' ou une adresse IP
    USER: process.env.USER,          // Le nom d'utilisateur pour la connexion à la base de données
    PASSWORD: process.env.PASSWORD,  // Le mot de passe pour la connexion à la base de données
    DBNAME: process.env.DBNAME,      // Le nom de la base de données à utiliser

    // Définir le dialecte utilisé pour la base de données (MySQL dans ce cas)
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,

    // Configuration du pool de connexions pour la gestion des connexions à la base de données
    pool: {
        // Le nombre maximal de connexions autorisées dans le pool
        max: 5,                      
        // Le nombre minimal de connexions autorisées dans le pool
        min: 0,                      
        // Le temps maximal (en ms) que Sequelize attend pour obtenir une connexion avant de lancer une erreur
        acquire: 30000,              
        // Le temps maximal (en ms) qu'une connexion peut rester inactive avant d'être fermée
        idle: 10000                   
    }
}
