const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = env => {
    let config = {
        entry: {
            main: path.resolve(__dirname, 'src')
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
                    include: [path.join(__dirname, 'src'), path.join(__dirname, 'views'), path.join(__dirname, 'components')],
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
                    'views/**/*',
                    'images/**/*',
                    'css/**/*',
                    'javascript/**/*',
                    'locales/**/*.json',
                    'resources/**/*.properties',
                    'definitions.cnd'
                ]
            })
        ],
        devtool: 'inline-source-map',
        mode: 'development'
    };

    if (env.deploy) {
        config.plugins.push(
            new WebpackShellPluginNext({
                onAfterDone: {
                    scripts: ['yarn jahia-deploy pack']
                }
            })
        );
    }

    return config;
};
