# 🦳 Mon petit geste

**Nom du site :** « Mon Petit Geste »

**Objectif :** Accompagner les personnes âgées dans leurs routines quotidiennes de manière simple et accessible.

## Sommaire

1. [Présentation](#1-présentation)

   1.1 [Introduction](#1-présentation)

   1.2 [Objectifs du site](#12-objectifs-du-site)

   1.3 [Structure du site](#13-structure-du-site)

   1.4 [Design et accessibilité](#14-design-et-accessibilité)

   1.5 [Outils et technologies utilisées](#15-outils-et-technologies-utilisées)

   1.6 [Évolutions possibles](#16-évolutions-possibles)

2. [Développement](#2-développement)

   2.1 [Installation du projet](#21-installation-du-projet)

   2.2 [Architecture / Organisation](#22-architecture--organisation)

   2.3 [Bonnes pratiques de code](#23-bonnes-pratiques-de-code)

   2.4 [Bonnes pratiques de collaboration](#24-bonnes-pratiques-de-collaboration)

   2.5 [Déploiement](#25-déploiement)

      2.5.1 [Minification](#251-minification)

## 1. Présentation

« Mon Petit Geste » est un petit site web conçu pour aider les personnes âgées à se repérer dans leur journée.

L’objectif est d'accompagner les personnes ayant besoin d'assistance afin qu'elles restent le plus autonomes possible, en rendant les gestes du quotidien visibles, accessibles et rassurants — pour elles, leur entourage et les personnes qui viennent les aider.

### 1.2. Objectifs du site

* Rappeler les gestes essentiels de la journée (matin, après-midi, soir)
* Faciliter l’autonomie des personnes âgées
* Offrir une interface claire, lisible et rassurante
* Favoriser le lien social et l’ancrage dans une routine
* Créer une interface claire, épurée et facile à utiliser
* Mettre en avant des routines utiles à la santé et au bien-être
* Concevoir un outil simple, non médical, mais bienveillant

### 1.3. Structure du site

Le site comporte plusieurs pages :

* **Accueil** : brève explication du site
* **Matin** : routines essentielles du début de journée
* **Après-midi** : activités, repos, hydratation
* **Soir** : rituels de fin de journée, préparation au coucher
* **Mentions légales** : informations liées au projet

### 1.4. Design et accessibilité

* Choix de couleurs contrastées
* Taille de police adaptée
* Utilisation de pictogrammes explicites (Font Awesome)
* Compatibilité lecteur d’écran
* Balises ARIA, alt, title, etc.
* Focus sur la simplicité visuelle

Le site est conçu selon des principes d’accessibilité :

* Couleurs à contraste élevé
* Police lisible, taille confortable
* Icônes explicites avec balises ARIA ou titres descriptifs
* Compatibilité avec les lecteurs d’écran
* Navigation claire (structure HTML logique, aria-labels, `aria-hidden`)

### 1.5. Outils et technologies utilisées

* **Trello** : pour lister et répartir les tâches
* **Figma** : pour la maquette
* **HTML5**
* **CSS3**
* **Font Awesome** : pour les icônes SVG
* **GitHub Pages** : pour l'hébergement

### 1.6. Évolutions possibles

* Développer le contenu avec les parties prenantes
* Ajouter une version audio
* Ajouter une option de personnalisation des routines
* Compatibilité tablette et smartphone renforcée
* Intégrer les retours utilisateurs / tests avec des seniors

## 2. Développement

### 2.1 Installation du projet

Voir le fichier README

### 2.2 Architecture / Organisation

* **Site statique standard**

**Code source** : `src/html/maPage.html`

**Structure CSS** : `src/css/base.css`

* Un seul fichier de style pour optimiser le chargement et éviter les doublons

**JS** :

* Disponible pour des évolutions futures mais actuellement non utilisé

**Assets** :

* Ensemble des images, SVG et polices

### 2.3 Bonnes pratiques de code

Les contributeurs sont responsables et doivent s'assurer de la qualité de leur contenu.

* **HTML**

  * Vérification de la conformité avec des outils comme le Nu Html Checker
  * Attention portée à la sémantique et au rôle des balises : éviter les balises `div` ou `span` sans signification
  * Utilisation rigoureuse des attributs ARIA pour l'accessibilité

* **CSS**

  * Vérification du rendu selon les navigateurs
  * Mise en place de fallback en cas d'échec de chargement de certains styles
  * Résponsivité sur tous types d’écrans (hors montres)
  * Attention à l’accessibilité : couleurs, tailles
  * Animations simples
  * Focus visibles et clairs

* **Assets**

  * Optimisation des fichiers : compression des polices, SVG, etc.

* **JS**

  * Non utilisé actuellement

### 2.4 Bonnes pratiques de collaboration

* Utilisation de GitHub
* Organisation basée sur Git Flow
  
  ![image](https://github.com/user-attachments/assets/49e8b61d-46d3-493d-b48b-900f4e69b9be)
  
* Branche `main` pour la production (modifications déployées automatiquement)
* Branche `develop` principale pour le développement
* Branches de fonctionnalité pour chaque développeur

Chaque fusion de branche (`feature` vers `develop`, ou `develop` vers `main`) déclenche une Pull Request avec revue par un ou plusieurs membres de l’équipe

### 2.5 Déploiement

* Site statique déployé sur GitHub Pages
* CI/CD mis en place avec GitHub Actions

#### 2.5.1 Minification

**Fichier de build : `build.mjs`**

* Génère un dossier `dist` avec l'ensemble du code source optimisé
* Modifie les fichiers HTML pour lier les fichiers minifiés

**Exemple :**

```html
<head>
  ...
  <title>Accueil</title>
  <link rel="stylesheet" href="../css/base.css" />
  <link rel="icon" href="../assets/svg/favicon.svg" type="image/svg+xml" />
</head>
```

Devient :

```html
<!DOCTYPE html><html lang="fr"><head><title>Accueil</title><link rel="stylesheet" href="./css/base.min.css"><link rel="icon" href="./assets/svg/favicon.svg" type="image/svg+xml"></head>
```
