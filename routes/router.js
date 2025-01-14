// Importer le contrôleur des utilisateurs

const AuthController = require('../controllers/auth.controller')

// Créer un routeur Express
const router = require('express').Router()


//Création d'un tenant
router.post('/createTenant', AuthController.RegisterTenant)

// Exporter le routeur pour qu'il soit utilisé dans l'application principale
module.exports = router
