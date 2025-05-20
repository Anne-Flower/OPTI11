# Stratégie d'infrastructure

## Table des matières  
1. [Sujet du projet final **Application web ultra-légère**](#1)  
2. [Notre projet : **Mon petit geste, le web-support ultra-léger pour les aides à domicile**](#2)  
3. [Guide de démarrage](#3)  
4. [Guide de développement](#4)  
5. [Navigateur supportés](#5)  

<a id="1"></a>
## 1. Sujet du projet final **Application web ultra-légère**

Concevoir en équipe un site 100 % statique (HTML + CSS + JavaScript minimal) :

* **Ultra-léger** : taille de page et nombre de requêtes réduits au strict nécessaire.  
* **Compatibilité maximale** : doit tourner sans frameworks récents, y compris sur vieilles machines, navigateurs obsolètes et connexions lentes.  
* **Accessibilité WCAG 2.1** : cible AA obligatoire, visez AAA.  
* **Performance & sobriété numérique** : temps de chargement court et empreinte carbone minimale.  
* **Déploiement** : publication sur une plateforme statique (GitHub Pages, Netlify, …).

<a id="2"></a>
## 2. Notre projet : **Mon petit geste, le web-support ultra-léger pour les aides à domicile**

Chaque explication prend du temps, et une fois la porte refermée, la personne aidée se retrouve seule — parfois inquiète, souvent hésitante.

**« Mon petit geste »**  
Un site statique, si léger qu’il se charge même sur un vieux PC ou en 3G faiblarde. Il regroupe :

- **Fiches gestes illustrées** : pas-à-pas visuel, police large, contraste AAA.  
- **Mémos** : rappels essentiels, validés par des professionnels.

### Pourquoi ?

| Atout                             | Bénéfice immédiat                                                        |
|-----------------------------------|--------------------------------------------------------------------------|
| **Ultra-léger (‹ 50 kB/page)**    | S’ouvre partout : vieux PC, tablette de prêt, réseau rural.              |
| **100 % accessible (WCAG 2.1 AA+)**| Lisible, navigable au clavier, compatible lecteur d’écran.               |
| **Temps gagné**                   | Moins de redémonstrations ; plus de présence humaine.                    |
| **Réduction des risques**         | Gestes standardisés → moins d’accidents domestiques.                     |

**Mon petit geste** : c’est la notice illustrée de la vie quotidienne, accessible à tout instant, pour que chaque geste redevienne simple.

![Illustration du Mon petit geste](./ressources/preview.png)

<a id="3"></a>
## 3. Guide de démarrage

Ouvrir `index.html` avec l'extension Live Serveur sur Visual Studio Code

### En production

**Installation du projet**

```bash
npm install
```
**Build les fichiers dans dans le dossier `/dist`**

```bash
npm run build
```

Puis ouvrir le fichier `index.html` contenu dans le dossier `/dist` avec Live Serveur

<a id="4"></a>  
## 4. Guide pour le développement

### Structure du projet

```
src/
├── html/
│   ├── index.html
│   └── about.html
├── css/
│   ├── base.css
│   ├── index.css
│   ├── about.css
│   └── article.css
├── js/
│   ├── utils/
│   │   ├── common.js
│   │   └── formHandler.js
│   ├── index.js
│   ├── about.js
│   └── article.js
└── assets/
    ├── images/
    ├── fonts/
    └── icons/
```

<a id="5"></a>
## 5. Navigateur supportés

- Chrome - 10
- Firefox - 4 
- Safari - 6 
- Edge - 12
- Internet Explorer - IE 9
- Opera - 11

![alt text](./ressources/support_nav.png)

Creation VM debian 12

root changeme user changeme


<a id="6"></a>
## 6. Tools

Deux outils dans la console de chrome qui on l'air sympa 

![chrome_performance](./ressources/chrome_perf.png)

![chrome_lighthouse](./ressources/chrome_lighthouse.png)
