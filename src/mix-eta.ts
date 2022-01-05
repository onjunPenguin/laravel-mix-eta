import * as mix from 'laravel-mix'
import * as eta from 'eta'
import {globbySync} from 'globby'
import globParent from 'glob-parent'
import * as upath from 'upath'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import {TemplateFunction} from 'eta/dist/types/compile'

class mixEtaPlugin {
    private from!: string
    private to!: string
    private data!: { [p: string]: string } | undefined

    dependencies() {
        return [
            'eta',
            'globby',
            'glob-parent',
            'upath'
        ]
    }

    register(from: string, to: string, data?: { [key: string]: string }) {
        this.from = from
        this.to = to
        this.data = data
    }

    webpackRules() {
        const data = this.data ?? {}

        return {
            test: /\.eta$/,
            loader: 'html-loader',
            options: {
                preprocessor(content: string | TemplateFunction, loaderContext: { resourcePath: any }) {
                    return eta.render(content, data, {filename: loaderContext.resourcePath})
                },
                attributes: false
            },
        }
    }

    webpackPlugins() {
        let plugins: HtmlWebpackPlugin[] = []
        const srcRoot: string = globParent(this.from)

        for (const srcFile of globbySync(this.from)) {
            const srcFileRelative =  upath.relative(srcRoot, srcFile)
            const outputFile = upath.resolve(this.to, upath.changeExt(srcFileRelative, '.html'))

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
