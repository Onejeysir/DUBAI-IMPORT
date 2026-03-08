# TruckParts Dubai — Guide de Déploiement

## Structure du projet
```
truckparts-deploy/
├── index.html          ← Point d'entrée HTML
├── package.json        ← Dépendances npm
├── vite.config.js      ← Configuration Vite
├── vercel.json         ← Config Vercel
├── netlify.toml        ← Config Netlify
├── .gitignore
└── src/
    ├── main.jsx        ← Point d'entrée React
    ├── App.jsx         ← Tout le code du site
    └── index.css       ← Reset CSS minimal
```

---

## OPTION A — Vercel (Recommandé, le plus simple)

### Étapes :
1. Créer un compte sur https://vercel.com (gratuit)
2. Installer Git si pas déjà fait : https://git-scm.com
3. Ouvrir un terminal dans le dossier du projet :

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit"

# Pousser sur GitHub (créer un repo sur github.com d'abord)
git remote add origin https://github.com/TON_USERNAME/truckparts.git
git push -u origin main
```

4. Sur Vercel → "New Project" → importer le repo GitHub
5. Vercel détecte Vite automatiquement → cliquer "Deploy"
6. Site en ligne en 2 minutes ! URL gratuite : https://truckparts.vercel.app

---

## OPTION B — Netlify (Drag & Drop, AUCUN CODE requis)

### Étapes :
1. Ouvrir un terminal dans le dossier du projet :

```bash
npm install
npm run build
```

Cela crée un dossier `dist/`

2. Aller sur https://netlify.com (créer un compte gratuit)
3. Sur le dashboard Netlify → glisser-déposer le dossier `dist/` dans la zone prévue
4. Site en ligne instantanément ! URL : https://random-name.netlify.app

### Pour un domaine personnalisé gratuit :
- Dans Netlify → "Domain settings" → ajouter votre domaine

---

## OPTION C — GitHub Pages

```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Ajouter dans package.json → "scripts":
# "deploy": "npm run build && gh-pages -d dist"

# Déployer
npm run deploy
```

Modifier vite.config.js : ajouter `base: '/nom-du-repo/'`

---

## Tester en local avant de déployer

```bash
npm install        # Installer les dépendances (une seule fois)
npm run dev        # Démarrer le serveur local → http://localhost:5173
npm run build      # Construire pour la production → dossier dist/
npm run preview    # Tester le build → http://localhost:4173
```

---

## Problèmes courants et solutions

| Erreur | Solution |
|--------|----------|
| `npm: command not found` | Installer Node.js sur https://nodejs.org |
| `Module not found: react` | Lancer `npm install` dans le dossier |
| Page blanche après déploiement | Vérifier que `vercel.json` ou `netlify.toml` est bien présent |
| Images qui ne chargent pas | Normal si hors ligne — Unsplash nécessite internet |
| Polices Google qui ne chargent pas | Normal si hors ligne |

---

## Versions requises
- Node.js : **v18+** (https://nodejs.org)
- npm : **v9+** (inclus avec Node.js)
