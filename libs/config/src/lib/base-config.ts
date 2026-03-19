import { workspaceRoot } from "@nx/devkit"
import { ModuleFederationConfig } from "@nx/module-federation"
import { NxModuleFederationDevServerPlugin, NxModuleFederationPlugin } from "@nx/module-federation/rspack"
import { NxAppRspackPlugin } from "@nx/rspack/app-plugin"
import { NxReactRspackPlugin } from "@nx/rspack/react-plugin"
import { type Configuration } from "@rspack/core"
import { join } from "path"

interface IRspackConfigParams {
    appName: string,
    appRoot: string,
    devPort: number,
    federationConfig: ModuleFederationConfig,
    assets?: {
        input: string,
        glob: string,
        output: string
    }[],
    runtimePlugin?: string
}

export function createRspackConfig({
    appName,
    appRoot,
    devPort,
    federationConfig,
    assets,
    runtimePlugin
}: IRspackConfigParams): Configuration {
    const runtimePlugins = runtimePlugin ? [runtimePlugin] : undefined

    return {
        output: {
            publicPath: 'auto',
            path: join(workspaceRoot, `dist/apps/${appName}`)
        },

        devServer: {
            port: devPort,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            historyApiFallback: {
                index: '/index.html',
                disableDotRule: true,
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
            },
            proxy: [],
        },

        ignoreWarnings: [
            /Failed to parse source map/,
            /@module-federation\/error-codes/
        ],

        experiments: {
            lazyCompilation: false,
        },

        plugins: [
            new NxAppRspackPlugin({
                tsConfig: `${appRoot}/tsconfig.app.json`,
                main: `${appRoot}/src/main.ts`,
                index: `${appRoot}/public/index.html`,
                baseHref: '/',
                styles: [`${appRoot}/src/styles.css`],
                outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
                optimization: process.env['NODE_ENV'] === 'production',
                assets,
                sourceMap: process.env['NODE_ENV'] === "development" ? true : false
            }),
            new NxReactRspackPlugin({}),
            new NxModuleFederationPlugin({ config: federationConfig }, { dts: false,  runtimePlugins}),
            new NxModuleFederationDevServerPlugin({ config: federationConfig })
        ],
    }
}