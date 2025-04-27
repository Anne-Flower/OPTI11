// webpack.config.js (à la racine du projet)

// Modules Node.js et plugins utilisés
const path                     = require('path');                            // module utilitaire pour construire des chemins
const { CleanWebpackPlugin }   = require('clean-webpack-plugin');            // supprime /dist avant chaque build
const CopyWebpackPlugin        = require('copy-webpack-plugin');              // copie des fichiers statiques vers /dist
const HtmlWebpackPlugin        = require('html-webpack-plugin');              // génère et injecte le HTML
const MiniCssExtractPlugin     = require('mini-css-extract-plugin');          // extrait le CSS en fichiers séparés
const CssMinimizerPlugin       = require('css-minimizer-webpack-plugin');     // minifie le CSS extrait
const TerserPlugin             = require('terser-webpack-plugin');            // minifie le JavaScript final
const ImageMinimizerPlugin     = require('image-minimizer-webpack-plugin');   // optimise les images (JPEG, PNG, SVG…)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');         // optionnel : visualizeur de bundle

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';  // true en prod, false en dev

  return {
    // ------------------------------------------------------------
    // Mode du build : 'development' (sourcemaps, live reload...) ou 'production' (minification, hash…)
    mode: isProd ? 'production' : 'development',

    // ------------------------------------------------------------
    // Points d’entrée : on définit un bundle JS par page/fonctionnalité
    entry: {
      index:      path.resolve(__dirname, 'src/js/index.js'),      // page d’accueil
      playground: path.resolve(__dirname, 'src/js/playground.js'), // page Playground
    },

    // ------------------------------------------------------------
    // Sortie : où/Webpack émet les fichiers compilés
    output: {
      path:                path.resolve(__dirname, 'dist'),      // dossier de sortie
      filename:            'js/[name].[contenthash].js',         // nom des bundles JS (cache busting)
      publicPath:          isProd ? '' : '/',                    // **ABSOLU** en prod, **relatif** en dev
      assetModuleFilename: 'assets/[hash][ext][query]',          // nom des resources (images, fonts…)
      clean:               true,                                 // vide dist avant chaque build
    },

    // ------------------------------------------------------------
    // Loaders : règles de gestion des fichiers source
    module: {
      rules: [
        {
          test: /\.html$/i,           // pour chaque HTML
          loader: 'html-loader',      // injecte automatiquement les src/srcset des <img>
          options: {
            sources: {
              list: [
                { tag: 'img', attribute: 'src',     type: 'src'    },
                { tag: 'img', attribute: 'srcset',  type: 'srcset' },
                { tag: 'img', attribute: 'data-src', type: 'src'   },
              ]
            },
          },
        },
        {
          test: /\.css$/i,            // pour chaque CSS
          use: [
            MiniCssExtractPlugin.loader, // extrait le CSS dans un .css séparé
            'css-loader',                // traite @import et url()
            'postcss-loader',            // applique PostCSS (autoprefixer…)
          ],
        },
        {
          test: /\.js$/i,             // pour chaque JS
          exclude: /node_modules/,    // à l’exception des modules externes
          use: 'babel-loader',        // transpile ESNext → ES5
        },
        {
          test: /\.(png|jpe?g|gif|webp|ico|svg)$/i, // images & SVG
          type: 'asset/resource',                   // copie dans dist/assets
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i, // polices
          type: 'asset/resource',           // même traitement que les images
        },
      ],
    },

    // ------------------------------------------------------------
    // Plugins : étendent Webpack (HTML, nettoyage, extraction CSS…)
    plugins: [
      new CleanWebpackPlugin(), // vide dist/

      // Copier des fichiers statiques (décommenter si besoin)
      // new CopyWebpackPlugin({ patterns: [{ from: 'public', to: '' }] }),

      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css', // nom du fichier CSS généré
      }),

      // Génération des pages HTML + injection auto. des bundles
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/html/index.html'),
        filename: 'index.html',
        chunks: ['index'],
        inject: 'body',
        minify: isProd && {
          collapseWhitespace: true,
          removeComments: true,
        },
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/html/playground.html'),
        filename: 'playground.html',
        chunks: ['playground'],
        inject: 'body',
        minify: isProd && { collapseWhitespace: true, removeComments: true },
      }),

      // (Optionnel) Rapport d’analyse de bundle
      new BundleAnalyzerPlugin({
        analyzerMode:   'static',
        reportFilename: '../.bundle/report.html',
        openAnalyzer:   false,
      }),
    ],

    // ------------------------------------------------------------
    // Optimisation : splitChunks, minification JS/CSS, optimisation images
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            minChunks: 2,
            name: 'common',
            reuseExistingChunk: true,
          },
        },
      },
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({ test: /\.css$/i }),
        new TerserPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng',  { optimizationLevel: 5 }],
                ['svgo', { plugins: [{ name: 'removeViewBox', active: false }] }],
              ],
            },
          },
        }),
      ],
    },

    // ------------------------------------------------------------
    // Résolution des imports : permet d’omettre les extensions .js et .css
    resolve: {
      extensions: ['.js', '.css'],
    },

    // ------------------------------------------------------------
    // DevServer : serveur local pour le dev (inactif en prod)
    devServer: isProd ? undefined : {
      static:     path.resolve(__dirname, 'dist'),
      port:       9000,
      open:       true,
      watchFiles: ['src/**/*'],
    },

    devServer: !isProd ? undefined : {
      static:     path.resolve(__dirname, 'dist'),
      port:       9000,
      open:       true,
      watchFiles: ['src/**/*'],
    },


    // ------------------------------------------------------------
    // Avertissements de performance (taille max des bundles/assets)
    performance: {
      hints:             'warning',
      maxEntrypointSize: 512_000,
      maxAssetSize:      512_000,
    },
  };
};
