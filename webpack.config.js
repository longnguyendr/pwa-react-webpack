const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www/js')
    },
    mode: "development",
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};