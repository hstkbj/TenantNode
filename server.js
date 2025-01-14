// Importation du module 'express' pour créer l'application web
const express = require('express');

// Importation du module 'cors' pour gérer les requêtes cross-origin
const cors = require('cors');

require('dotenv').config()

// Création d'une instance de l'application Express
const app = express();

// Définition des options de CORS pour spécifier quelles origines peuvent accéder aux ressources
var corsOptions = {
    origin: 'https://localhost:8081'  // Autoriser les requêtes uniquement depuis ce domaine
}



// Appliquer les options CORS à toutes les requêtes entrantes
app.use(cors(corsOptions))

// Middleware pour parser les corps des requêtes au format JSON
app.use(express.json())

// Middleware pour parser les données d'un formulaire envoyées en URL-encoded (utilisé par les formulaires HTML classiques)
app.use(express.urlencoded({ extended: true }))  // 'extended: true' permet de gérer des objets plus complexes dans les données URL-encoded

//router
const router = require('./routes/router')
app.use('/api', router)

// Testé L'api
app.get('/',(req,res)=>{
    res.json({message: 'Hello World'})
})

//Port
const PORT = process.env.PORT || 8080

//Lancement du serveur
app.listen(PORT,()=>{
    console.log('Server lancer sur le port: ' + PORT)
})
