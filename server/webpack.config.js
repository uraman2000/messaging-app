const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  target: 'node', // Indicate that this build is for Node.js
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  output: {
    filename: 'server.bundle.js', // Output bundle filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    libraryTarget: 'commonjs2', // CommonJS format for Node.js
  },
  mode: 'development', // Set to 'production' for optimized output
  node: {
    __dirname: false, // Preserve the original __dirname
    __filename: false, // Preserve the original __filename
  },
};
