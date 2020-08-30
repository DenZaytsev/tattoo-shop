const withCSS = require('@zeit/next-css');
const GoogleFontsPlugin = require('google-fonts-webpack-plugin');

module.exports = withCSS({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    });

    config.plugins.push(
      new GoogleFontsPlugin({
        fonts: [{ family: 'Roboto', variants: ['300', '400', '700'] }],
      }),
    );

    return config;
  },
});
