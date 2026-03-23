import type {
    ModuleFederationRuntimePlugin
} from '@module-federation/enhanced/runtime'

type Manifest = Record<string, string>;

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
            const manifest = await loadManifest();

            const remoteUrl = manifest[args.id]

            if (!remoteUrl) {
                return args
            }

            const entry = `${remoteUrl}/remoteEntry.js`

            args.remoteInfo.entry = entry;

            return {
                ...args,
                remoteInfo: {
                    ...args.remoteInfo,
                    entry: entry
                }
            }
        },
        
    }
}