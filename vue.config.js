const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '^/users': {
        target: 'http://127.0.0.1:8000/',
        ws: true,
        changeOrigin: true
      },
    }
  },
  transpileDependencies: true
})
