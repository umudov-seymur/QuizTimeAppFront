module.exports = {
  pluginOptions: {
    i18n: {
      locale: "az",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
