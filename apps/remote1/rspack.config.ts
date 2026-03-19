import { createRspackConfig } from "@libs/config";
import federationConfig from "./module-federation.config"

export default createRspackConfig({
  appName: 'remote1',
  appRoot: 'apps/remote1',
  devPort: 4201,
  federationConfig,
  assets: [
    {
      input: "apps/remote1/public",
      glob: "favicon.ico",
      output: "./"
    },
  ]
})