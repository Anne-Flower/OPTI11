# 🧓 Mon petit geste

**Nom du site :** « Mon Petit Geste »

**Objectif :** Accompagner les personnes âgées dans leurs routines quotidiennes de manière simple et accessible.

## **Sommaire**

## 1. **Présentation**

« Mon Petit Geste«  est un petit site web pensé pour aider les personnes âgées à se repérer dans leur journée.  

L’objectif est d'accompagner les personne ayant besoin d'assistante afin qu'il reste le plus autonome possible, en rendant les gestes du quotidien visibles, accessibles et rassurants. Pour la personne, son entourage et les personnes qui viennent l'aider. 

### 1.2. Objectifs du site
Rappeler les gestes essentiels de la journée (matin, après-midi, soir)

Faciliter l’autonomie des personnes âgées

Offrir une interface claire, lisible et rassurante

Favoriser le lien social et la routine

- Créer une interface claire, épurée et facile à utiliser
- Mettre en avant des routines utiles à la santé et au bien-être
- Permettre une autonomie quotidienne renforcée
- Concevoir un outil simple, non médical, mais bienveillant


### 1.3. Structure du site

Le site comporte plusieurs pages :
- **Accueil** : brève explication du site
- **Matin** : routines essentielles du début de journée
- **Après-midi** : activités, repos, hydratation
- **Soir** : rituels de fin de journée, préparation au coucher
- **Mentions légales** : informations liées au projet

### 1.4. Design et accessibilité
Choix des couleurs contrastées

Taille de police adaptée

Utilisation de pictogrammes explicites (Font Awesome)

Compatibilité lecteur d’écran

Balises ARIA, alt, title, etc.

Focus sur la simplicité visuelle

Le site est conçu selon des principes d’accessibilité :
- Couleurs à contraste élevé
- Police lisible, taille confortable
- Icônes explicites avec balises ARIA ou titres descriptifs
- Compatibilité avec les lecteurs d’écran
- Navigation claire (structure HTML logique, aria-labels, `aria-hidden`)


### 1.5. Outils et technologies utilisées
- **Trello** : pour lister et répartir les tâches
- **Figma** : pour la maquette
- **HTML5**
- **CSS3**
- **Font Awesome** : pour les icônes SVG
- **GitHub Pages** : pour l'hébergement


### 1.6. 📝 Évolutions possibles
Développer le contnue avec les partie prenante

Ajouter une version audio

Ajouter une option de personnalisation des routines

Compatibilité tablette et smartphone renforcée

Feedback utilisateur / tests seniors

## 2. Développment

### 2.1 Instalation du projet 

Voir README 

### 2.2 Architecture / Organisation

Site Statique standard 

Code source de la page 
Src/html/maPage.html
Structure du code html

CSS 
Src/css/base.css

Un seul fichier de style pour optimser le chargemen et eviter le doublon de code

JS 
Diponible pour des evolution future mais actuellment pas utilisé

Assets
Enssembles des images , svg et fonts

### 2.3 Bonne pratique de code 

Les contributeurs sont responsable il doit s'assurer de la qualité de sont contenue 

- HTML

  - Vérifier la conformiter de la structure avec des outils comme Nu Html Checker
  - Attention particulière sur la sémantique et le role de balise, pas debalise div ou span 
  - Attention particulière sur les aria pour l'assebilité

- CSS 
  - Verification de la disponibilité du style en fonction des navigateur 
  - Mettre en place des fallback en cas d'echec de chargement de certain style 
  - Vérification du reponsive pour tout type d'ecran (sauf montre)
  - Attention a l'assecibilité : couleur, taille
  - Animation simples 
  - Focus clair

- Assets 
  - Optimisation des assets : compression des fonts, svg ...

- JS
  - Pas de JS 

### 2.4 Bonne pratique de collaboration 

Utilisation de github
Avec une organisation baser sur git flow
Branche main pour la production déployer atomatiquement des modifications
Develop branche principale 
Branche de feature contenant le développment de chaque personne

Chaque merge de feature vers develop ou develop vers main déclenche un PR avec une review d'un ou plusieur membre du groupe


### 2.5 Déploiement 

Site statique déployer sur github page 
Mise en place d'une CI/CD avec githb action

#### 2.5.1 Mimification

**Fichier de build (build.mjs)**

Genere un dossier dist avec l'essemble du code source optimiser
Modifie dans html le lien externe pour utilisation les fichier optimiser 

Exemple : 

```
  <head>
    ...
    <title>Accueil</title>
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="icon" href="../assets/svg/favicon.svg" type="image/svg+xml" />
  </head>
```

Devient : 

```
<!DOCTYPE html><html lang="fr"><head><title>Accueil</title><link rel="stylesheet" href="./css/base.min.css"><link rel="icon" href="./assets/svg/favicon.svg" type="image/svg+xml"></head>
```



