import type { SharedFunction } from "@nx/module-federation";

const coreLibraries = new Set([
    'react',
    'react-dom',
    'react-router-dom',
    '@libs/shared-config',
]);

export const getSharedDeps: SharedFunction = (libraryName, sharedConfig) => {
    if (coreLibraries.has(libraryName)) {
        return {
            ...sharedConfig,
            singleton: true,
            eager: true,
            requiredVersion: false
        };
    }

    return sharedConfig;
};
