const fs = require('fs')
const path = require('path')

const apps = ['remote1', 'remote2']

const registry = {}

apps.forEach(app => {
  const pkgPath = path.resolve(__dirname, `../../apps/${app}/package.json`)

  if (!fs.existsSync(pkgPath)) {
    console.warn(`package.json не найден для ${app}`)
    return;
  }

  const pkg = require(pkgPath)
  const envVarName = `${app.toUpperCase()}_URL`;

  registry[app] = {
    url: `${process.env[envVarName]}`,
    version: pkg.version
  }
})

const outputPath = path.resolve(__dirname, "../../apps/shell/src/assets/mf-registry.json")

fs.writeFileSync(
  outputPath,
  JSON.stringify(registry, null, 2)
)