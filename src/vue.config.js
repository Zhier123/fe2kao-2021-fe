
module.exports = {
    // publicPath:process.env.NODE_ENV === 'production'?'./':'/',
    // outputDir:'dist',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001/',
          changeOrigin: true,
          logLevel:'debug',
        }
      }
    }
  }
  