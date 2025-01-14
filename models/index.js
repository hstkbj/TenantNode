// Importer la configuration de la base de données à partir du fichier 'dbConfig.js'
const dbConfig = require('../config/dbConfig')

// Importer les classes Sequelize et DataTypes de la bibliothèque Sequelize
const { Sequelize, DataTypes } = require('sequelize')

// Créer une instance Sequelize pour se connecter à la base de données
const sequelize = new Sequelize(
    dbConfig.DBNAME,        // Nom de la base de données
    dbConfig.USER,          // Nom d'utilisateur pour la connexion à la base de données
    dbConfig.PASSWORD,      // Mot de passe pour la connexion à la base de données
    {
        host: dbConfig.HOST,             // Hôte où se trouve la base de données (ex : 'localhost')
        dialect: dbConfig.dialect,       // Le dialecte de la base de données (ex : 'mysql')
        operatorsAliases: false,         // Désactiver les alias des opérateurs pour la sécurité

        // Configuration du pool de connexions pour gérer les connexions à la base de données
        pool: {
            max: dbConfig.pool.max,         // Le nombre maximal de connexions dans le pool
            min: dbConfig.pool.min,         // Le nombre minimal de connexions dans le pool
            acquire: dbConfig.pool.acquire, // Temps maximal d'attente pour obtenir une connexion
            idle: dbConfig.pool.idle        // Temps maximal avant qu'une connexion inactive soit fermée
        }
    }
)

// Vérifier la connexion à la base de données avec la méthode 'authenticate'
sequelize.authenticate()
    .then(() => {
        console.log('connecter')   // Si la connexion est réussie, afficher ce message
    })
    .catch(error => {
        console.log(error)        // Si une erreur survient, afficher l'erreur
    })

// Créer un objet 'db' pour stocker les différentes références aux modèles et à la connexion
const db = {}

// Ajouter Sequelize et l'instance Sequelize à l'objet 'db' pour y accéder ailleurs
db.Sequelize = Sequelize
db.sequelize = sequelize

// Importer le modèle 'UserModel.js' et l'associer à l'instance Sequelize
db.users = require('./UserModel.js')(sequelize, DataTypes)
db.tenant = require('./TenantModel.js')(sequelize, DataTypes)


// Synchroniser les modèles avec la base de données
// La méthode 'sync' permet de synchroniser l'état des modèles avec la base de données.
// L'option `{force: false}` signifie que la base de données ne sera pas réinitialisée (pas de suppression des tables).
db.sequelize.sync({force:false})
.then(()=>{
    console.log('yes re-sync done!')
})


// Exporter l'objet 'db' pour l'utiliser ailleurs dans l'application
module.exports = db
