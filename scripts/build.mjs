// scripts/build.mjs
import fs from 'fs';
import path from 'path';
import { minify as minifyHTML } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import * as terser from 'terser';
import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import svgo from 'imagemin-svgo';
import { globby } from 'globby';

const SRC_DIR = 'src';
const DIST_DIR = 'dist';

const ensureDir = (filePath) => {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
};

const copyFile = (src, dest) => {
  ensureDir(dest);
  fs.copyFileSync(src, dest);
};

const copyAndMinify = async () => {
  const htmlFiles = await globby(`${SRC_DIR}/**/*.html`);
  const cssFiles = await globby(`${SRC_DIR}/**/*.css`);
  const jsFiles = await globby(`${SRC_DIR}/**/*.js`);
  const imgFiles = await globby(`${SRC_DIR}/**/*.{jpg,png}`);
  const svgFiles = await globby(`${SRC_DIR}/**/*.svg`);
  const fontFiles = await globby(`${SRC_DIR}/**/*.{woff,woff2,ttf,otf,eot}`);

  const cssMap = new Map();
  const jsMap = new Map();

  // Minify CSS
  for (const file of cssFiles) {
    const relPath = file.replace(`${SRC_DIR}/`, '');
    const minPath = relPath.replace(/\.css$/, '.min.css');
    const dest = path.join(DIST_DIR, minPath);
    const content = fs.readFileSync(file, 'utf8');
    const output = new CleanCSS().minify(content);
    ensureDir(dest);
    fs.writeFileSync(dest, output.styles);
    cssMap.set(relPath, minPath);
  }

  // Minify JS
  for (const file of jsFiles) {
    const relPath = file.replace(`${SRC_DIR}/`, '');
    const minPath = relPath.replace(/\.js$/, '.min.js');
    const dest = path.join(DIST_DIR, minPath);
    const content = fs.readFileSync(file, 'utf8');
    const result = await terser.minify(content);
    ensureDir(dest);
    fs.writeFileSync(dest, result.code);
    jsMap.set(relPath, minPath);
  }

  // Minify HTML + update references
  for (const file of htmlFiles) {
    const relPath = file.replace(`${SRC_DIR}/`, '');
    const dest = path.join(DIST_DIR, relPath);
    let content = fs.readFileSync(file, 'utf8');

    // Replace .css/.js with .min.css/.min.js
    for (const [original, minified] of cssMap.entries()) {
      content = content.replace(new RegExp(original.replace('.', '\\.'), 'g'), minified);
    }
    for (const [original, minified] of jsMap.entries()) {
      content = content.replace(new RegExp(original.replace('.', '\\.'), 'g'), minified);
    }

    const result = await minifyHTML(content, {
      collapseWhitespace: true,
      removeComments: true,
    });
    ensureDir(dest);
    fs.writeFileSync(dest, result);
  }

  // Optimize and move images (JPG, PNG)
  await imagemin(imgFiles, {
    destination: path.join(DIST_DIR, 'assets/images'),
    plugins: [mozjpeg(), pngquant()]
  });

  // Optimize and move SVG
  await imagemin(svgFiles, {
    destination: path.join(DIST_DIR, 'assets/svg'),
    plugins: [svgo()]
  });

  // Copy fonts
  for (const file of fontFiles) {
    const relPath = file.replace(`${SRC_DIR}/`, '');
    const dest = path.join(DIST_DIR, relPath);
    copyFile(file, dest);
  }
};

copyAndMinify();
