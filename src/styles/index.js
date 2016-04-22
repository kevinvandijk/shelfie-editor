// require every scss file in ./ into the build

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context(
  './',
  true, // include subdirectories
  /\.scss$/
));
