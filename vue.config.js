// const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: 'public/index.html',
//         // any other options you'd normally set are still supported:
//         compile: false,
//         inject: true,
//       }),

//       new PrerenderSPAPlugin({
//         staticDir: path.join(__dirname, 'dist'),
//         // Required - Routes to render. (EXAMPLE: routes: ['/', '/about', '/some/deep/nested/route']),
//         routes: ['/'],
//       }),
//     ],
//   },
// };
