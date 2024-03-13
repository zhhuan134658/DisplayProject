const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 公共路径
  publicPath: './',
  // 打包路径
  outputDir: 'dist',
  // 静态资源路径
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false, // 不需要生产环境的 source map 设置false（减小dist文件大小，加速构建）
  devServer: {
    // disableHostCheck: true,
    // open: true,  // npm run serve后自动打开页面
    // host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
    // port: 8080, // 开发服务器运行端口号
    proxy: {
      //代理跨域
      //   '/api': {
      //     target: 'http://zktp.zzdingyun.com/',
      //     changeOrigin: true,
      //     logLevel: 'debug',
      //     pathRewrite: { '^/api': '' },
      //   },

      '/': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        // logLevel: 'debug',
      },
    },
  },
  configureWebpack: () => {
    const webpackConfigure = {
      performance: {
        hints: 'warning',
        //入口起点的最大体积 整数类型（以字节为单位）
        maxEntrypointSize: 50000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js');
        },
      },
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
    };
    console.log('VUECONFIG', process.env.NODE_ENV);
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'development'
    ) {
      return {
        ...webpackConfigure,
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
          }),
        ],
      };
    }
    return webpackConfigure;
  },
};
