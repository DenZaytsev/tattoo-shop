const withCSS = require('@zeit/next-css');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

module.exports = withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.tsx$/,
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
