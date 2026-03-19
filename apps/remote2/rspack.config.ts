import { createRspackConfig } from "@libs/config";
import federationConfig from "./module-federation.config"

export default createRspackConfig({
  appName: 'remote2',
  appRoot: 'apps/remote2',
  devPort: 4202,
  federationConfig,
  assets: [
    {
      input: "apps/remote2/public",
      glob: "favicon.ico",
      output: "./"
    },
  ]
})