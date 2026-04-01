[![Statut du Projet](https://img.shields.io/badge/Statut-En%20Cours-yellow?style=flat-square)]([LIEN_VERS_VOTRE_REPO])
[![Type](https://img.shields.io/badge/Type-Frontend-blue?style=flat-square)]([LIEN_VERS_VOTRE_REPO])
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)]([LIEN_VERS_VOTRE_REPO])
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)]([LIEN_VERS_VOTRE_REPO])

# My Meal Planner Front-end

## Objectifs
- Gestion d'un planning des repas (déjeuner et dîner) sur la semaine
- Génération d'une liste de course en fonction du planning
- CRUD de plats à insérer dans le planning

## Public Cible
- Personnes en recherche d'une aide pour la gestion d'un planning des repas de la semaine 
- Personnes organisées voulant une plateforme pour enregistrer des recettes

## Tehnologies utilisées
- **React**
- **TypeScript**

## Fonctionnalités
- Inscription / Connexion / Déconnexion
- Planning hebdomadaire : Gestion des repas à partir d'une liste créer par l'utilisateur
- Génération d'une liste de course en fonction du planning (possibles ajout d'éléments sur toutes les semaines)
- CRUD de plats à insérer dans le planning (nom, type, ingrédients)
- Possibilité de créer de nouveaux types de plats

## Installation et lancement
### Dépendances
```
npm install
```

- **Date-fns** : Manipulation des dates
- **Dotenv** : Variables environnementales
- **Jwt-decode** : écodage du token d'authentification
- **React**, **React-dom**, **React-router-dom**: React
- **React-icons** : Bibliothèque d'icônes React
- **Sass** : Extension CSS
- **Zustand** : Données globales, Hooks

### Lancement
```
npm run dev
```

## Architecture de l'application
```
├── Inscription
├── Connexion
├── Planning hebdomadaire
├── Liste de repas
└── Liste de course
```

## Architecture du dossier

``````