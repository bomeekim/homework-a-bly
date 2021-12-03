module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader');
  },
  transpileDependencies: [
    'vuetify',
  ],
};
