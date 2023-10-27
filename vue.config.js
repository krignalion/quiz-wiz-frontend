const Dotenv = require('dotenv-webpack');

module.exports = {
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env',
        safe: true,
        systemvars: true
      })
    ]
  }
};
