# Strategie d'infrastructure

## Table des matières  
0. [Notre projet](#0)  
1. [Sujet du projet final **Application web ultra-légère**](#1)  
2. [Introduction : le défi d’un Web universel](#2)  
3. [Compatibilité navigateurs & fallbacks](#3)  
4. [Performance : alléger et accélérer](#4)  
5. [Déploiement statique & CI/CD léger](#5)  
6. [Design & UX minimalistes](#6)  
7. [Check-lists récapitulatives](#7)  
8. [Annexes : ressources et outils pratiques](#8)  

<a id="1"></a>
## 1. Sujet du projet final **Application web ultra-légère**

### 1. But
Concevoir en équipe un site 100 % statique (HTML + CSS + JavaScript minimal) :

* **Ultra-léger** : taille de page et nombre de requêtes réduits au strict nécessaire.  
* **Compatibilité maximale** : doit tourner sans frameworks récents, y compris sur vieilles machines, navigateurs obsolètes et connexions lentes.  
* **Accessibilité WCAG 2.1** : cible AA obligatoire, visez AAA.  
* **Performance & sobriété numérique** : temps de chargement court et empreinte carbone minimale.  
* **Déploiement** : publication sur une plateforme statique (GitHub Pages, Netlify, …).

---

### 2. Exigences détaillées

| Catégorie | Exigences non négociables |
|-----------|---------------------------|
| **Sémantique & structure** | • Employer les balises HTML5 adaptées.<br>• Fournir des rôles ARIA uniquement quand nécessaire (pas d’excès). |
| **Accessibilité WCAG 2.1** | • Contraste conforme AA (AAA recherché).<br>• Indicateur **focus** toujours visible.<br>• Lecture linéaire logique.<br>• Navigation **100 % clavier**.<br>• Totalement exploitable avec un lecteur d’écran. |
| **CSS & JS** | • Styles et scripts minimaux et minifiés.<br>• Site **responsive** sans surcharge.<br>• Prévoir des **fallbacks CSS** pour anciens navigateurs.<br>• Si JS est requis : garantir un fonctionnement acceptable lorsque JS est absent ou non supporté. |
| **Ressources** | • Polices : peu nombreuses, formats optimisés, `font-display:swap`.<br>• Images / icônes : SVG + sprites ou formats compressés.<br>• Limiter le nombre de requêtes HTTP répétées. |
| **Optimisation & audit** | • Réduire au maximum poids et requêtes.<br>• Vérifier avec Lighthouse, PageSpeed Insights et l’onglet réseau des DevTools. |
| **Déploiement** | • Mettre la version de production en ligne sur GitHub Pages ou Netlify pour audit réel.<br>• Tester sous conditions dégradées (profil réseau « pire » dans DevTools). |
| **Inspiration** | • Garder en tête l’exemple : <https://motherfuckingwebsite.com/> |

---

### 3. Livrables attendus
1. **Application en production** (URL publique GitHub Pages / Netlify).  
2. **Code source** propre et documenté (référentiel Git).  
3. **Rapport d’audit** (captures Lighthouse/PageSpeed + explications des optimisations).  
4. **Dossier d’accessibilité** : description des choix WCAG et tests clavier/lecteur d’écran.  

Respectez chaque point : tout écart sera considéré comme un critère manquant.

### 4. Présentation du projet final – Consignes

#### 1. Présentation de groupe  
- Définir **la solution globale** apportée par votre projet.  

#### 2. Présentation individuelle  
- Mettre en avant **les fonctionnalités que vous avez implémentées**.  
- Expliquer **vos choix techniques et fonctionnels**.  

#### 3. Évaluation  
- La note finale combine **présentation de groupe** *et* **présentation personnelle**.  
- **La partie individuelle a un poids plus important** dans la notation.  

#### 4. Après « fin » de projet  
> Vous pensez avoir terminé avant la date de soutenance ?  
> **Continuez à travailler** : il y a toujours des améliorations possibles !  

#### 5. Pendant les soutenances des autres groupes  
- Écoutez attentivement.  
- Comparez les **défis techniques** et les **solutions** mises en place dans les autres projets.  

<a id="0"></a>

## Notre projet

### **Guide Autonomie, le web-support ultra-léger pour les aides à domicile**

Chaque explication prend du temps, et une fois la porte refermée, la personne aidée se retrouve seule ― parfois inquiète, souvent hésitante.

**“Guide Autonomie”**  
Un site statique, si léger qu’il se charge même sur un vieux PC ou une 3 G faiblarde. Il regroupe :

- **Fiches gestes illustrées** : pas-à-pas visuel, police large, contraste AAA.  
- **Mémos santé & hygiène** : rappels essentiels, validés par des pros.

### Pourquoi ?

| Atout | Bénéfice immédiat |
|-------|-------------------|
| **Ultra-léger (‹ 50 kB/page)** | S’ouvre partout : vieux PC, tablette de prêt, réseau rural. |
| **100 % accessible (WCAG 2.1 AA+)** | Lisible, navigable au clavier, compatible lecteur d’écran. |
| **Temps gagné** | Moins de re-démonstrations ; plus de présence humaine. |
| **Réduction des risques** | Gestes standardisés → moins d’accidents domestiques. |

### En trois clics, comment ça change la donne ?

1. **L’aidant ouvre la fiche « Se lever en sécurité »** sur son téléphone.  
2. **Montre l’image** et lit les étapes avec le bénéficiaire.

**Guide Autonomie**, c’est la notice illustrée de la vie quotidienne, accessible à tout instant, pour que chaque geste redevienne simple ― et que l’autonomie ne soit plus un combat, mais une routine maîtrisée.

---


## Support de cours – Projet **Web ultra-léger, compatible & accessible** 


<a id="2"></a>
## 2. Introduction : le défi d’un Web universel  
- **Réalité** : diversité de navigateurs, versions, OS, tailles d’écran, débits.  
- **Exigence** : l’application doit rester **utilisable et accessible**, même sur *IE 11, Chrome 49, Firefox ESR* ou une connexion 56 k.  
- **Fil rouge** : sobriété numérique → moins de kilo-octets, moins d’énergie, meilleure inclusion.

---

<a id="3"></a>
## 3. Compatibilité navigateurs & fallbacks  

### 3.1 Limites des navigateurs cibles  

| Navigateurs | Restrictions majeures |
|-------------|----------------------|
| IE 11, Chrome 49, Firefox ESR | • CSS : Flexbox partiel, pas de Grid, valeurs récentes absentes.<br>• JS : pas d’ES6+, pas d’`fetch()`, Service Workers, Web Components.<br>• HTML : types d’input & balises sémantiques mal gérés. |

> *Ignorer ces limites = design cassé, fonctions manquantes, voire page blanche.*

### 3.2 Progressive enhancement vs graceful degradation  
| Approche | Principe | Pourquoi la préférer ? |
|----------|----------|------------------------|
| **Graceful degradation** | Construire pour les navigateurs modernes puis « raboter » pour les anciens. | Complexe, souvent bancal. |
| **Progressive enhancement** (à adopter) | • D’abord une base solide : HTML sémantique, CSS simple, presque pas de JS.<br>• Puis ajouts conditionnels (styles/JS modernes) activés quand c’est supporté. | Tout le monde accède au contenu ; UX enrichie uniquement si possible. |

### 3.3 Techniques de fallback HTML/CSS  

| Cas | Stratégie | Exemple |
|-----|-----------|---------|
| **Ordre des règles** | Ancienne syntaxe avant la moderne. | ```css<br>.box{background:#00f;}         /* fallback */<br>.box{background:linear-gradient(red,orange);} /* moderne */``` |
| **Layouts** | 1) `float` / `inline-block`<br>2) `@supports(display:flex)` → Flexbox/Grid | IE 11 ignore `@supports`, utilisera donc la version 1. |
| **Unités / valeurs** | Valeur compatible → valeur moderne. | `margin:0 auto;` puis `display:flex; justify-content:center;` |
| **Balises HTML5** | Forcer l’affichage « bloc » sous IE. | `article,aside,footer,...{display:block;}` |
| **Préfixes vendeurs** | `-webkit-`, `-ms-`, `-moz-` si nécessaire (via *Can I use*). | `-ms-flex:1;` pour IE. |

### 3.4 Stratégie JavaScript minimaliste  
- **ES5 only** (ou transpilation via Babel).  
- Scripts non critiques en `<script defer>` ou `async`.  
- Éviter les dépendances lourdes : inspirons-nous des sites *no-JS* (ex. *motherfuckingwebsite.com*).

### 3.5 Validation : tester dans le vrai navigateur  
- Machines virtuelles (Microsoft IE/Edge VM, BrowserStack…).  
- Vieux appareils physiques si possible.  
- Les émulateurs DevTools ≠ rendu réel !

---

<a id="4"></a>
## 4. Performance : alléger et accélérer  

### 4.1 Pourquoi la vitesse est vitale ?  
Site lent → utilisateurs frustrés, coûts data plus élevés, énergie gaspillée. Sur une vieille machine, la performance **est** l’accessibilité.

### 4.2 Ce qui plombe nos pages  
1. **Fichiers trop lourds** (images HD, bundles JS géants).  
2. **Trop de requêtes** (icônes PNG individuelles, multiples CSS).  
3. **Ressources bloquantes** (scripts ou CSS mal placés).

### 4.3 Optimiser : chasse aux ko  

| Ressource | Actions conseillées | Outils |
|-----------|--------------------|--------|
| **HTML** | Code sémantique, sans balises inutiles. | — |
| **CSS** | Écrire simple, **minifier**. | cssnano, clean-css |
| **JS** | Élaguer, ES5, minifier. | Terser, UglifyJS |
| **Images** | Format adapté (JPG, PNG, SVG), taille max utile, compression. | TinyPNG, Squoosh, SVGO |
| **Polices** | 1-2 familles, 2-3 graisses. WOFF2 prioritaire + `font-display:swap`. | Google Fonts Helper |
| **Icônes** | Sprite PNG ou SVG symbol. | svg-sprite |

### 4.4 Limiter les requêtes HTTP  
- Sprite ou SVG inline.  
- **Critical CSS** inline ; reste en fichier unique.  
- Groupes : 1 CSS principal, 1 JS (ou 2 : critique / non-critique).

### 4.5 Cache navigateur  
- Plateformes statiques (GitHub Pages, Netlify, Vercel) envoient déjà de bons en-têtes → 2ᵉ visite quasi instantanée.

### 4.6 Mesurer & contrôler  
| Outil | Ce qu’il montre |
|-------|-----------------|
| **Lighthouse** | Audit complet, opportunités et diagnostics. |
| **PageSpeed Insights** | Données terrain + Lighthouse Web. |
| **DevTools → Network** | Taille, ordre, temps, cache, simulation 3G/56 k. |

---

<a id="5"></a>
## 5. Déploiement statique & CI/CD léger  

### 5.1 Qu’est-ce qu’un déploiement léger ?  
Mettre en ligne **fichiers statiques** (HTML, CSS, JS minimal, images, polices) sur une plateforme qui les sert directement : pas de serveur applicatif, pas de BD.

| Léger | Lourd |
|-------|-------|
| Fichiers statiques | Web server + runtime (Node, PHP…) + BD |
| Config minimale | Sécurité, logs, patchs à gérer |
| Très rapide & peu coûteux | Plus lent, plus cher |

### 5.2 Plateformes conseillées  

| Plateforme | Atouts | Coût |
|------------|--------|------|
| **GitHub Pages** | Intégré GitHub, domaine custom | Gratuit |
| **Netlify** | CDN, formulaires, déploiement CLI / GUI | Gratuit (starter) |
| **Vercel** | Previews par branche, très rapide | Gratuit (hobby) |
| **S3 + CloudFront** | Contrôle fin, gros trafic | Payant à l’usage |

### 5.3 CI/CD : « push ⇒ site à jour »  
**Workflow GitHub Actions minimal** (`.github/workflows/deploy.yml`) :  
```yaml
on: { push: { branches: [main] } }

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # (optionnel) npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./public }
      - uses: actions/deploy-pages@v4
```
HTTPS, CDN et cache = automatiques.

---

<a id="6"></a>
## 6. Design & UX minimalistes  

### 6.1 Concepts  
- **Design minimaliste** : chaque pixel doit avoir une raison d’être.  
- **UX minimaliste** : réduire les étapes, vocabulaire clair, se concentrer sur les *Must have* (MoSCoW).

### 6.2 Priorisation fonctionnelle  
1. Lister tout → classer Must / Should / Could / Won’t.  
2. Concevoir les parcours uniquement autour des *Must*.  
3. Ajouter le reste *si* ça n’impacte pas la performance.

### 6.3 Principes visuels & accessibilité  

| Domaine | Bon réflexe | Pourquoi |
|---------|-------------|----------|
| **Layout** | 1-2 colonnes, white-space | Rendu rapide & lisibilité |
| **Palette** | 3-4 couleurs, contraste ≥ 4.5:1 | WCAG AA |
| **Typo** | 1-2 familles, tailles lisibles | Moins de requêtes |
| **Images & icônes** | SVG optimisés, bitmap compressé | Poids réduit |
| **Animations** | Sobres, fonctionnelles, GPU-friendly | CPU & batterie |
| **Accessibilité** | Balises sémantiques, focus visible, ordre DOM logique | Inclusif |

---

<a id="7"></a>
## 7. Check-lists récapitulatives  

| Domaine | À cocher avant livraison |
|---------|-------------------------|
| **Compatibilité** | ☐ HTML sémantique<br>☐ CSS : fallback → moderne<br>☐ JS ES5 / transpilé<br>☐ Préfixes vendeurs si besoin<br>☐ Tests sur IE 11, Chrome 49, Firefox ESR |
| **Performance** | ☐ Images compressées & taille adaptée<br>☐ CSS/JS minifiés & regroupés<br>☐ `defer/async` appliqué<br>☐ Polices limitées + `font-display:swap`<br>☐ Audit Lighthouse ≥ 90 |
| **Déploiement** | ☐ Dossier `public` propre<br>☐ HTTPS actif (auto)<br>☐ CI/CD réussit<br>☐ URL testée desktop/mobile/legacy<br>☐ Domaine custom (si requis) |
| **Design/UX** | ☐ Contraste AA atteint<br>☐ Layout simple & aérien<br>☐ Focus clavier visible<br>☐ Animations utiles & légères |

---

<a id="8"></a>
## 8. Annexes : ressources pratiques  
- **Can I use** : compatibilité CSS/JS – <https://caniuse.com>  
- **WCAG Contrast Checker** : vérifier ratios  
- **TinyPNG / Squoosh** : compression PNG/JPG/WebP  
- **SVGO** : optimisation SVG  
- **PageSpeed Insights** : https://pagespeed.web.dev  
- **BrowserStack Live** : tests multi-navigateurs réels  
- **Microsoft Edge VM** : machines virtuelles IE / Edge gratuites 