const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // Ищем scss файлы
                use: ['style-loader', 'css-loader', 'sass-loader'], // Загружаем и обрабатываем scss файлы
            },
            {
                test: /\.html$/, // Ищем html файлы
                use: ['html-loader'], // Загружаем и обрабатываем html файлы
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // размер в байтах
                            outputPath: 'assets',
                            filename: '[name].[contenthash].[ext]',
                            esModule: false, // для корректной работы require()
                        },
                    },
                ],
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон html-файла
            filename: 'index.html', // Имя выходного html-файла
        }),
    ],

    devServer: {
        static: path.join(__dirname, 'dist'), // Папка с статическими файлами (имеет по умолчанию имя "dist")
        compress: true, // Активирует сжатие для улучшения производительности
        port: 8080, // Порт, на котором будет работать сервер
        open: true, // Откроет браузер автоматически после запуска
        hot: true, // Включает горячее обновление (Hot Module Replacement, HMR)
        client: {
            overlay: {
                errors: true, // Отображает ошибки в режиме реального времени в браузере
                warnings: true // Отображает предупреждения в режиме реального времени в браузере
            }
        }
    },
};