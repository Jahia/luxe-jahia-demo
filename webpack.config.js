const fs = require('fs');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const componentsDir = './src/client';
const exposes = {};

const {CycloneDxWebpackPlugin} = require('@cyclonedx/webpack-plugin');

/** @type {import('@cyclonedx/webpack-plugin').CycloneDxWebpackPluginOptions} */
const cycloneDxWebpackPluginOptions = {
    specVersion: '1.4',
    rootComponentType: 'library',
    outputLocation: './bom'
};

fs.readdirSync(componentsDir).forEach(file => {
    const componentName = path.basename(file, path.extname(file));
    exposes[componentName] = path.resolve(componentsDir, file);
});

module.exports = env => {
    let configs = [
        {
            entry: {
                'luxe-jahia-demo': path.resolve(__dirname, './src/client/index')
            },
            output: {
                path: path.resolve(__dirname, 'javascript/client')
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
                                    ['@babel/preset-env', {modules: false, targets: {safari: '7', ie: '10'}}],
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
            mode: 'development',
            plugins: [
                // This plugin allows a build to provide or consume modules with other independent builds at runtime.
                new ModuleFederationPlugin({
                    name: 'luxe-jahia-demo',
                    library: {type: 'assign', name: 'window.appShell = (typeof appShell === "undefined" ? {} : appShell); window.appShell[\'luxe-jahia-demo\']'},
                    filename: '../client/remote.js',
                    exposes: exposes,
                    shared: {
                        react: {
                            requiredVersion: '^18.2.0',
                            singleton: true
                        },
                        'react-i18next': {},
                        'i18next': {}
                    }
                }),
                // This plugin help you to attach extra files or dirs to webpack's watch system
                new ExtraWatchWebpackPlugin({
                    files: [
                        'src/**/*',
                        'components/**/*',
                        'views/**/*',
                        'images/**/*',
                        'css/**/*',
                        'javascript/**/*',
                        'locales/**/*.json',
                        'resources/**/*.properties',
                        'definitions.cnd',
                        'import.xml',
                        'package.json'
                    ]
                }),
                new CycloneDxWebpackPlugin(cycloneDxWebpackPluginOptions)
            ]
        },
        {
            entry: {
                styles: './src/scss/styles.scss',
                editMode: ['./src/scss/edit-mode.scss']
            },
            output: {
                path: path.resolve(__dirname, 'dist/css')
            },
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false
                                }
                            },
                            'sass-loader'
                        ]
                    }
                ]
            },
            plugins: [
                // This plugin extracts CSS into separate files
                new MiniCssExtractPlugin({ filename: '[name].css' }),
                // This plugin creates a CycloneDX Software Bill of Materials containing an aggregate of all bundled dependencies.
                new CycloneDxWebpackPlugin(cycloneDxWebpackPluginOptions)
            ]
        },
        {
            entry: {
                main: path.resolve(__dirname, 'src/server')
            },
            output: {
                path: path.resolve(__dirname, 'dist')
            },
            externals: {
                '@jahia/js-server-core': 'jsServerCoreLibraryBuilder.getLibrary()',
                react: 'jsServerCoreLibraryBuilder.getSharedLibrary(\'react\')',
                'react-i18next': 'jsServerCoreLibraryBuilder.getSharedLibrary(\'react-i18next\')',
                i18next: 'jsServerCoreLibraryBuilder.getSharedLibrary(\'i18next\')',
                'styled-jsx/style': 'jsServerCoreLibraryBuilder.getSharedLibrary(\'styled-jsx\')',
            },
            resolve: {
                mainFields: ['module', 'main'],
                extensions: ['.mjs', '.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.jsx$/,
                        include: [path.join(__dirname, 'src/server'), path.join(__dirname, 'src/client')],
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
            plugins: [
                // This plugin help you to attach extra files or dirs to webpack's watch system
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
                }),
                // This plugin creates a CycloneDX Software Bill of Materials containing an aggregate of all bundled dependencies.
                new CycloneDxWebpackPlugin(cycloneDxWebpackPluginOptions)
            ],
            devtool: 'inline-source-map',
            mode: 'development'
        }
    ];

    if (env.deploy) {
        // This plugin allows you to run any shell commands before or after webpack builds.
        const webpackShellPlugin = new WebpackShellPluginNext({
            onAfterDone: {
                scripts: ['yarn jahia-deploy']
            }
        });

        let config = configs[configs.length - 1];
        if (!config.plugins) {
            config.plugins = [];
        }

        config.plugins.push(webpackShellPlugin);
    }

    return configs;
};
