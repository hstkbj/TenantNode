// Importer les modèles définis dans le dossier models
const { getTenantDB } = require('../tenant/tenant.manager');
const bcrypt = require('bcrypt');


// Ajouter un nouvel utilisateur
const addUser = async (req, res) => {

    const { tenantDbName } = req.params;
    const dbTenant = await getTenantDB(tenantDbName);

    // Hachage du mot de passe avant de l'enregistrer
    const salt = await bcrypt.genSalt(10);  // Générer un sel avec un facteur de coût de 10
    const hashedPassword = await bcrypt.hash(req.body.password, salt);  // Hasher le mot de passe

    // Créer un objet avec les données reçues de la requête (req.body)
    let data = {
        username: req.body.username,  // Récupérer le nom d'utilisateur
        email: req.body.email,        // Récupérer l'email
        password: hashedPassword  // Récupérer le mot de passe
    }

    // Insérer les données dans la table "users" en utilisant Sequelize
    const user = await dbTenant.users.create(data)
    
    // Envoyer la réponse avec un statut 200 et l'utilisateur créé
    res.status(200).send(user)
}


// Récupérer tous les utilisateurs
const getAllUser = async (req, res) => {

    const { tenantDbName } = req.params;
    const dbTenant = await getTenantDB(tenantDbName);

    // Récupérer tous les utilisateurs de la table "users"
    let users = await dbTenant.users.findAll({})
    
    // Envoyer la liste des utilisateurs avec un statut 200
    res.status(200).send(users)
}


// Récupérer un utilisateur par ID
const getOneUser = async (req, res) => {
    let id = req.params.id  // Récupérer l'ID de l'utilisateur depuis l'URL

    // Chercher un utilisateur avec l'ID correspondant
    let user = await User.findOne({ where: { id: id } })
    
    // Envoyer l'utilisateur trouvé avec un statut 200
    res.status(200).send(user)
}


// Mettre à jour un utilisateur
const UpdateUser = async (req, res) => {
    let id = req.params.id  // Récupérer l'ID de l'utilisateur à mettre à jour

    // Mettre à jour l'utilisateur avec les nouvelles données de la requête (req.body)
    const user = await User.update(req.body, { where: { id: id } })
    
    // Envoyer la réponse de mise à jour avec un statut 200
    res.status(200).send(user)
}


// Supprimer un utilisateur
const DeleteUser = async (req, res) => {
    let id = req.params.id  // Récupérer l'ID de l'utilisateur à supprimer

    // Supprimer l'utilisateur de la base de données
    await User.destroy({ where: { id: id } })
    
    // Envoyer une réponse indiquant que l'utilisateur a été supprimé
    res.status(200).send('User deleted')
}


// Exporter les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers
module.exports = {
    addUser,
    getAllUser,
    getOneUser,
    UpdateUser,
    DeleteUser
}
