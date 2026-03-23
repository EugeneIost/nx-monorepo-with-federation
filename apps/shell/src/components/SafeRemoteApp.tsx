import React, { FC, ReactNode, Suspense, useMemo } from "react";
import { RemoteErrorBoundary } from "./RemoteErrorBoundary";

interface Props {
    remote: string;
    module: string;
    fallback?: ReactNode;
}

const remoteApps = {
    remote1: React.lazy(async () => await import("remote1/Module")),
    remote2: React.lazy(async () => await import("remote2/Module")),
};

export const SafeRemoteApp: FC<Props> = ({ remote, module, fallback = <div>Remote недоступен</div> }) => {
    const RemoteComponent = useMemo(() => {
        const remoteApp = remoteApps[remote as keyof typeof remoteApps];

        if (!remoteApp) {
            return () => fallback;
        }

        return remoteApps[remote as keyof typeof remoteApps];
    }, [remote, module]);

    return (
        <Suspense fallback={<div>loading</div>}>
            <RemoteErrorBoundary fallback={fallback}>
                <RemoteComponent />
            </RemoteErrorBoundary>
        </Suspense>
    );
};
