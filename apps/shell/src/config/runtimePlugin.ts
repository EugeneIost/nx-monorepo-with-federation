import type {
  ModuleFederationRuntimePlugin,
} from '@module-federation/enhanced/runtime'

type Manifest = Record<string, {
  url: string;
  version: string
}>;

let manifestPromise: Promise<Manifest> | null = null

function loadManifest(): Promise<Manifest> {
  if (!manifestPromise) {
    manifestPromise = fetch("/assets/mf-registry.json")
      .then(r => typeof r.json === 'function' ? r.json() : r)
      .catch(err => {
        console.error('Ошибка загрузки mf-registry.json', err)
      })
  }

  return manifestPromise
}

export default function runtimePlugin(): ModuleFederationRuntimePlugin {
  return {
    name: 'mf-runtime-plugin',
    async afterResolve(args) {
      if (process.env['NODE_ENV'] === "production") {
        const manifest = await loadManifest();

        const remoteConfig = manifest[args.id]

        if (!remoteConfig) {
          return args
        }

        const entry = `${remoteConfig.url}/${args.id}/${remoteConfig.version}/remoteEntry.js`

        args.remoteInfo.entry = entry;

        return {
          ...args,
          remoteInfo: {
            ...args.remoteInfo,
            entry: entry
          }
        }
      }

      return args
    },
  }
}