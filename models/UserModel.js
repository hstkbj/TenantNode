// Exporter la fonction qui définit le modèle "User" pour Sequelize
module.exports = (sequelize, DataTypes) => {
    // Définir le modèle "users" dans la base de données en utilisant Sequelize
    const User = sequelize.define("users", { // Le nom de la table est "users"
        // Définition de la colonne "username"
        username: {
            type: DataTypes.STRING, // Le type de la colonne est une chaîne de caractères
            allowNull: false // Cette colonne ne peut pas être nulle (obligatoire)
        },
        // Définition de la colonne "email"
        email: {
            type: DataTypes.STRING, // Le type de la colonne est une chaîne de caractères
            allowNull: false, // Cette colonne ne peut pas être nulle
            unique: true // L'email doit être unique, il ne peut pas y avoir deux utilisateurs avec le même email
        },
        // Définition de la colonne "password"
        password: {
            type: DataTypes.STRING, // Le type de la colonne est une chaîne de caractères
            allowNull: false // Cette colonne ne peut pas être nulle (obligatoire)
        }
    });

    // Retourner le modèle "User" pour l'utiliser ailleurs dans l'application
    return User;
}
