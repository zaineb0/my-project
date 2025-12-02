# Maison Nova - Marketplace Étudiant

Bienvenue dans le projet **Maison Nova**, une application de marketplace développée avec Angular. Ce projet est conçu pour les étudiants souhaitant apprendre le développement d'applications web modernes avec Angular, en incluant des fonctionnalités d'authentification, de gestion de produits, de panier d'achat et de profils utilisateur.

## Description du Projet

Maison Nova est une plateforme de marketplace où les utilisateurs peuvent :
- S'inscrire et se connecter
- Parcourir les produits disponibles
- Ajouter des produits au panier
- Effectuer des paiements simulés
- Gérer des profils vendeur ou administrateur

Le projet utilise un backend mock avec JSON Server pour simuler une API REST.

## Fonctionnalités Principales

- **Authentification** : Inscription, connexion et déconnexion des utilisateurs
- **Gestion des Produits** : Affichage des produits, détails des produits
- **Panier d'Achat** : Ajout, suppression et gestion des articles dans le panier
- **Profils Utilisateur** : Profils pour les vendeurs et administrateurs
- **Interface Moderne** : Utilisation d'Angular Material pour une UI cohérente
- **Notifications** : Toasts pour les messages utilisateur avec ngx-toastr

## Technologies Utilisées

- **Frontend** : Angular 16
- **UI/UX** : Angular Material, ngx-toastr
- **Backend Mock** : JSON Server
- **Conteneurisation** : Docker et Docker Compose
- **Langage** : TypeScript
- **Outils** : Angular CLI, Karma (tests unitaires)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)
- [Angular CLI](https://angular.io/cli) : `npm install -g @angular/cli`
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/) (optionnel, pour la conteneurisation)

## Installation et Configuration

1. **Cloner le repository** :
   ```bash
   git clone <url-du-repo>
   cd marketplace
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

## Lancement de l'Application

### Méthode 1 : Lancement Manuel (sans Docker)

1. **Démarrer le backend mock** :
   ```bash
   npm run json-server
   ```
   Le serveur JSON sera accessible sur `http://localhost:3000`

2. **Démarrer l'application Angular** :
   ```bash
   npm start
   ```
   ou
   ```bash
   ng serve
   ```
   L'application sera accessible sur `http://localhost:4200`

### Méthode 2 : Lancement avec Docker

1. **Construire et lancer les conteneurs** :
   ```bash
   docker-compose up --build
   ```

2. **Accéder à l'application** :
   - Frontend : `http://localhost:4200`
   - Backend : `http://localhost:3000`

## Structure du Projet

```
src/
├── app/
│   ├── admin/              # Composant administrateur
│   ├── auth.guard.ts       # Garde d'authentification
│   ├── auth.service.ts     # Service d'authentification
│   ├── cart/               # Composant panier
│   ├── cart.service.ts     # Service du panier
│   ├── home/               # Page d'accueil
│   ├── login/              # Composant de connexion
│   ├── payment/            # Composant de paiement
│   ├── product-details/    # Détails des produits
│   ├── product.service.ts  # Service des produits
│   ├── profile-admin/      # Profil administrateur
│   ├── profile-vendeur/    # Profil vendeur
│   ├── signup/             # Composant d'inscription
│   ├── vendeur/            # Composant vendeur
│   ├── app-routing.module.ts  # Configuration des routes
│   ├── app.component.*     # Composant principal
│   └── app.module.ts       # Module principal
├── assets/                 # Ressources statiques
└── index.html              # Point d'entrée HTML
```

## Scripts Disponibles

- `npm start` : Lance le serveur de développement Angular
- `npm run build` : Construit l'application pour la production
- `npm run json-server` : Lance le serveur JSON mock
- `npm test` : Exécute les tests unitaires
- `npm run watch` : Construit en mode watch pour le développement

## Tests

Pour exécuter les tests unitaires :
```bash
npm test
```

## Contribution

Ce projet est destiné à l'apprentissage. N'hésitez pas à :
- Explorer le code source
- Modifier les composants
- Ajouter de nouvelles fonctionnalités
- Améliorer l'interface utilisateur

## Ressources Utiles

- [Documentation Angular](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [JSON Server](https://github.com/typicode/json-server)
- [Docker Documentation](https://docs.docker.com/)

---

**Note** : Ce projet est une version étudiante conçue pour l'apprentissage du développement Angular. Il utilise des données mockées et n'est pas destiné à un environnement de production réel.
