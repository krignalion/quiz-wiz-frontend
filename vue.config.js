const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const Dotenv = require('dotenv-webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env',  //Path to your .env file
        safe: true,  // Load variables only if they already exist (do not overwrite)
        systemvars: true  // Take into account environment variables
      })
    ]
  }
};
