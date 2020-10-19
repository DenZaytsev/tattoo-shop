const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withLinaria = require('./lib/next-linaria');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

let nextConfig = withLinaria(
  withCSS({
    webpack(config) {
      // config.plugins.push(
      //   new GoogleFontsPlugin({
      //     fonts: [{ family: 'Roboto', variants: ['300', '400', '700'] }],
      //   }),
      // );

      return config;
    },
  }),
);

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
