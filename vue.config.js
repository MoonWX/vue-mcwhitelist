const { defineConfig } = require('@vue/cli-service')
// eslint-disable-next-line no-unused-vars
const https = require('https');
const path = require('path');
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    https: {
      cert: fs.readFileSync(path.join(__dirname, 'keys/cert.crt')),
      key: fs.readFileSync(path.join(__dirname, 'keys/cert.key'))
    }
  }
})
