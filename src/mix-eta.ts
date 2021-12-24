const mix = require('laravel-mix')
const eta = require('eta')
const globby = require('globby')
const globParent = require('glob-parent')
const upath = require('upath')

const HtmlWebpackPlugin = require('html-webpack-plugin');

class mixEtaPlugin {
    private from!: string;
    private to!: string;
    private data!: {};

    dependencies() {
        return [
            'eta',
            'globby',
            'glob-parent',
            'upath'
        ];
    }

    register(from: string, to: string, data = {}) {
        this.from = from
        this.to = to
        this.data = data
    }

    webpackRules() {
        const {data} = this

        return {
            test: /\.eta$/,
            loader: 'html-loader',
            options: {
                preprocessor(content: any, loaderContext: any) {
                    return eta.render(content, data, {filename: loaderContext.resourcePath})
                },
                attributes: false
            },
        }
    }

    webpackPlugins() {
        let plugins: any[] = []
        const srcRoot: string = globParent(this.from)

        for (const srcFile of globby.sync(this.from)) {
            const srcFileRelative: string =  upath.relative(srcRoot, srcFile)
            const outputFile: string = upath.resolve(this.to, upath.changeExt(srcFileRelative, '.html'))

            plugins = [...plugins, new HtmlWebpackPlugin({
                filename: outputFile,
                template: srcFile,
                inject: false,
            })]
        }
        return plugins
    }
}

mix.extend('eta', new mixEtaPlugin())
