const fs = require('fs');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

// Read all files in the client components directory in order to expose them with webpack module federation more easily
// Those components are exposed in order to be hydrate/rendered client side
const componentsDir = './src/client';
const exposes = {};
fs.readdirSync(componentsDir).forEach(file => {
    const componentName = path.basename(file, path.extname(file));
    exposes[componentName] = path.resolve(componentsDir, file);
});

module.exports = env => {
    let config = {
        entry: {
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
            new ModuleFederationPlugin({
                name: 'jahia-npm-module-example',
                library: {type: 'assign', name: 'window.appShell = (typeof appShell === "undefined" ? {} : appShell); window.appShell[\'jahia-npm-module-example\']'},
                filename: '../client/remote.js',
                exposes: exposes,
                shared: {
                    react: {
                        requiredVersion: '^18.2.0'
                    }
                }
            }),
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
