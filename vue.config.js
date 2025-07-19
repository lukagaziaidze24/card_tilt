const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: {
  //     key: fs.readFileSync('./certs/key.pem'),
  //     cert: fs.readFileSync('./certs/cert.pem'),
  //   },
  //   allowedHosts: 'all',
  // },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/css/globals.scss";
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/card_tilt/'
    : '/',
})
