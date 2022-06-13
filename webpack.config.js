module.exports = {
    entry: {
      index: './src/script.js',
      stamps: './src/stampscript.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist',
    },
  };
  