const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        styles: ['./src/styles/main_page.css','./src/styles/header_footer.css',
                 './src/styles/detailed_info.css', "./src/styles/authorization_page.css" ],
    },
    output: {
        clean: false,
        assetModuleFilename: "assets/[hash][ext]"
    },
    devServer: {
        open: true,
        static: {
            directory: './src/pages',
            watch: true
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'main_page.html',
            template: "./src/pages/main_page.html",
            chunks: ['main_page']}),
        new HtmlWebpackPlugin({
            filename: 'company_info.html',
            template: "./src/pages/company_info.html",
            chunks: ['detailed_info']}),
        new HtmlWebpackPlugin({
            filename: 'authorization_page.html',
            template: "./src/pages/authorization_page.html",
            chunks: ['authorization_page']})
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
};