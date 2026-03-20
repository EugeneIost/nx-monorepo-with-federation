import React, { FC, ReactNode, Suspense, useMemo } from "react";
import { RemoteErrorBoundary } from "./RemoteErrorBoundary";

interface Props {
    remote: string;
    module: string;
    fallback?: ReactNode;
}

const remoteApps = {
    test_remote1: React.lazy(async () => await import("remote1/Module")),
    test_remote2: React.lazy(async () => await import("remote2/Module")),
};

export const SafeRemoteApp: FC<Props> = ({ remote, module, fallback = <div>Remote недоступен</div> }) => {
    const RemoteComponent = useMemo(() => {
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
