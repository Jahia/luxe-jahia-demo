const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
    let configs = [
        {
            entry: {
                main: path.resolve(__dirname, 'src/server')
            },
            output: {
                path: path.resolve(__dirname, 'dist')
            },
            externals: {
                '@jahia/js-server-engine': 'jsServerEngineLibraryBuilder.getLibrary()',
                react: 'jsServerEngineLibraryBuilder.getSharedLibrary(\'react\')',
                'styled-jsx/style': 'jsServerEngineLibraryBuilder.getSharedLibrary(\'styled-jsx\')'
            },
            resolve: {
                mainFields: ['module', 'main'],
                extensions: ['.mjs', '.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.jsx$/,
                        include: [path.join(__dirname, 'src/server')],
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { modules: false, targets: { safari: '7', ie: '10' } }],
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    'styled-jsx/babel'
                                ]
                            }
                        }
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true
                                }
                            },
                            'sass-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new ExtraWatchWebpackPlugin({
                    files: [
                        'src/**/*',
                        'images/**/*',
                        'css/**/*',
                        'javascript/**/*',
                        'locales/**/*.json',
                        'resources/**/*.properties',
                        'settings/**/*',
                        'definitions.cnd',
                        'import.xml',
                        'package.json'
                    ]
                })
            ],
            devtool: 'inline-source-map',
            mode: 'development'
        },
        {
            entry: './src/scss/styles.scss',
            output: {
                path: path.resolve(__dirname, 'css')
            },
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new MiniCssExtractPlugin({ filename: '[name].css' })
            ]
        },
        {
            entry: {
                main: './src/client'
            },
            output: {
                path: path.resolve(__dirname, 'javascript')
            },
            resolve: {
                mainFields: ['module', 'main'],
                extensions: ['.mjs', '.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.jsx$/,
                        include: [path.join(__dirname, 'src/client')],
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { modules: false, targets: { safari: '7', ie: '10' } }],
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    'styled-jsx/babel'
                                ]
                            }
                        }
                    }
                ]
            },
            devtool: 'inline-source-map',
            mode: 'development'
        }
    ];

    const webpackShellPlugin = new WebpackShellPluginNext({
        onAfterDone: {
            scripts: ['yarn jahia-deploy pack']
        }
    });

    if (env.deploy) {
        let config = configs[0];
        if (!config.plugins) {
            config.plugins = [];
        }

        config.plugins.push(webpackShellPlugin);
    }

    return configs;
};
