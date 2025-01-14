// Importer le contrôleur des utilisateurs
const UserController = require('../controllers/userController')
const AuthController = require('../controllers/auth.controller')

// Créer un routeur Express
const router = require('express').Router()

// Route pour ajouter un utilisateur (Méthode POST)
router.post('/addUser', UserController.addUser)
// - Reçoit les données utilisateur (username, email, password) dans le corps de la requête.
// - Appelle la fonction `addUser` du contrôleur pour ajouter un utilisateur dans la base de données.

// Route pour récupérer tous les utilisateurs (Méthode GET)
router.get('/allUser', UserController.getAllUser)
// - Appelle `getAllUser` pour retourner la liste complète des utilisateurs.

// Route pour afficher un utilisateur spécifique par son ID (Méthode GET)
router.get('/showUser/:id', UserController.getOneUser)
// - `:id` est un paramètre dynamique (par exemple `/showUser/5`).
// - Appelle `getOneUser` pour récupérer un utilisateur précis à partir de son ID.

// Route pour mettre à jour un utilisateur par ID (Méthode PUT)
router.put('/updateUser/:id', UserController.UpdateUser)
// - Reçoit l'ID de l'utilisateur à mettre à jour dans l'URL (`:id`) et les nouvelles données dans le corps de la requête.
// - `UpdateUser` met à jour les champs correspondants de cet utilisateur.

// Route pour supprimer un utilisateur par ID (Méthode DELETE)
router.delete('/deleteUser/:id', UserController.DeleteUser)
// - Supprime l'utilisateur correspondant à l'ID reçu dans l'URL.
// - Appelle `DeleteUser` pour effectuer la suppression.

//Création d'un tenant
router.post('/createTenant', AuthController.RegisterTenant)

// Exporter le routeur pour qu'il soit utilisé dans l'application principale
module.exports = router
