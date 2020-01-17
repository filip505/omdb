const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:80',
        'babel-polyfill',
        './src/App.jsx'


    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    output: {
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};