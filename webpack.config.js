// webpack.config.js (à la racine du projet)

// Modules Node.js et plugins utilisés
const path                     = require('path');                            // utilitaire de gestion de chemins
const { CleanWebpackPlugin }   = require('clean-webpack-plugin');            // supprime /dist avant chaque build
const CopyWebpackPlugin        = require('copy-webpack-plugin');              // copie des fichiers statiques
const HtmlWebpackPlugin        = require('html-webpack-plugin');              // génère et injecte le HTML
const MiniCssExtractPlugin     = require('mini-css-extract-plugin');          // extrait le CSS en fichiers séparés
const CssMinimizerPlugin       = require('css-minimizer-webpack-plugin');     // minifie le CSS extrait
const TerserPlugin             = require('terser-webpack-plugin');            // minifie le JavaScript
const ImageMinimizerPlugin     = require('image-minimizer-webpack-plugin');   // optimise images & SVG
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');         // analyseur de bundle (optionnel)

module.exports = {
  // ------------------------------------------------------------
  // Mode du build : 'development' ou 'production' (minification, etc.)
  // Par défaut si NODE_ENV non défini, on prend 'production'
  mode: 'production',

  // ------------------------------------------------------------
  // Points d’entrée : un bundle JS par page
  entry: {
    index:   path.resolve(__dirname, 'src/js/index.js'),   // page d’accueil
    about:   path.resolve(__dirname, 'src/js/about.js'),   // page À propos
    article: path.resolve(__dirname, 'src/js/article.js'), // page Article
  },

  // ------------------------------------------------------------
  // Sortie (fichiers générés dans /dist)
  output: {
    path:                path.resolve(__dirname, 'dist'),    // dossier de sortie
    filename:            'js/[name].[contenthash].js',       // nom des bundles JS (hash pour cache busting)
    publicPath:          '',                                 // URLs relatives (pas de slash en début)
    assetModuleFilename: 'assets/[hash][ext][query]',        // nom des assets (images, fonts…)
    clean:               true,                               // équivalent à CleanWebpackPlugin
  },

  // ------------------------------------------------------------
  // Règles de traitement des différents types de fichiers
  module: {
    rules: [
      // 1) HTML : injecte les <img src> / srcset / data-src
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              { tag: 'img', attribute: 'src',     type: 'src' },
              { tag: 'img', attribute: 'srcset',  type: 'srcset' },
              { tag: 'img', attribute: 'data-src', type: 'src' },
            ]
          },
        },
      },

      // 2) CSS : lit les .css, les traite avec PostCSS, puis les extrait
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // place le CSS extrait dans un fichier .css
          'css-loader',                // résout les @import et url()
          'postcss-loader',            // applique PostCSS (autoprefixer, etc.)
        ],
      },

      // 3) JavaScript : transpile ESNext → ES5 via Babel
      {
        test: /\.js$/i,
        exclude: /node_modules/,    // ignore les dépendances externes
        use: 'babel-loader',
      },

      // 4) Images & SVG : copie en tant que fichiers (asset/resource)
      {
        test: /\.(png|jpe?g|gif|webp|ico|svg)$/i,
        type: 'asset/resource',
      },

      // 5) Polices : idem images
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // ------------------------------------------------------------
  // Plugins
  plugins: [
    new CleanWebpackPlugin(), // supprime /dist avant chaque build

    // Extraction du CSS en fichiers séparés
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // nom des fichiers CSS générés
    }),

    // Génération des pages HTML avec injection automatique des bundles associés
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/index.html'), // template source
      filename: 'index.html',      // fichier de sortie
      chunks: ['index'],           // n’injecte que le bundle “index”
      inject: 'body',              // scripts en bas de <body>
      minify: {                    // options de minification du HTML
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/about.html'),
      filename: 'about.html',
      chunks: ['about'],
      inject: 'body',
      minify: { collapseWhitespace: true, removeComments: true },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/articles/article1.html'),
      filename: 'articles/article1.html',
      chunks: ['article'],
      inject: 'body',
      minify: { collapseWhitespace: true, removeComments: true },
    }),
  ],

  // ------------------------------------------------------------
  // Optimisation des bundles
  optimization: {
    // découpage automatique pour vendor + common chunks
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // tout ce qui vient de node_modules
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          minChunks: 2,     // modules partagés par au moins 2 entrées
          name: 'common',
          reuseExistingChunk: true,
        },
      },
    },

    // Active la minification
    minimize: true,
    minimizer: [
      // Minification du CSS extrait
      new CssMinimizerPlugin({
        test: /\.css$/i,
      }),

      // Minification du JS
      new TerserPlugin(),

      // Optimisation des images (SVGO, gifsicle, jpegtran, optipng…)
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng',  { optimizationLevel: 5 }],
              ['svgo', {
                // configuration SVGO : on garde le viewBox
                plugins: [
                  { name: 'removeViewBox', active: false },
                ],
              }],
            ],
          },
        },
      }),

      // Génération d’un rapport d’analyse (optionnel)
      new BundleAnalyzerPlugin({
        analyzerMode:   'static',               // génère report.html
        reportFilename: '../.bundle/report.html',
        openAnalyzer:   false,                  // ne l’ouvre pas automatiquement
      }),
    ],
  },

  // ------------------------------------------------------------
  // Résolution des imports
  resolve: {
    extensions: ['.js', '.css'], // possibilité d’omettre ces extensions dans les imports
  },

  // ------------------------------------------------------------
  // DevServer pour le mode développement
  devServer: {
    static:     path.resolve(__dirname, 'dist'), // sert le contenu de /dist
    port:       9000,                            // port local
    open:       true,                            // ouvre le navigateur
    watchFiles: ['src/**/*'],                    // reload à chaque changement
  },

  // ------------------------------------------------------------
  // Avertissements de performance
  performance: {
    hints:             'warning',   // affiche un warning si trop gros
    maxEntrypointSize: 512_000,     // seuil d’entrée (en octets)
    maxAssetSize:      512_000,     // seuil d’asset
  },
};
