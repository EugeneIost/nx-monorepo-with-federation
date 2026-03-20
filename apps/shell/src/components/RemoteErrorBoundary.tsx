import React, { ErrorInfo, ReactNode } from "react";

interface RemoteErrorBoundaryProps {
  fallback: ReactNode;
  children?: ReactNode;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

export class RemoteErrorBoundary extends React.Component<RemoteErrorBoundaryProps, RemoteErrorBoundaryState> {
  constructor(props: RemoteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("RemoteErrorBoundary caught error:", error, info);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}