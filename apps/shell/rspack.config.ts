import { createRspackConfig } from "@libs/config";
import federationConfig from "./module-federation.config"

const runtimePlugin = require.resolve('./src/config/runtimePlugin.ts')

export default createRspackConfig({
  appName: 'shell',
  appRoot: 'apps/shell',
  devPort: 4201,
  federationConfig,
  assets: [
    {
      input: "apps/shell/public",
      glob: "favicon.ico",
      output: "./"
    },
    {
      input: "apps/shell/src/assets",
      glob: "mf-registry.json",
      output: "./assets"
    },
  ],
  runtimePlugin
})
