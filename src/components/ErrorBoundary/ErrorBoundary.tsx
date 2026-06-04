import type { ReactNode } from "react";
import { Component } from "react";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: {
    componentStack?: string;
  } | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <h1>Oops! Something went wrong</h1>
            <p className={styles.errorMessage}>
              We're sorry for the inconvenience. An unexpected error has
              occurred.
            </p>
            {this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Details</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button className={styles.resetButton} onClick={this.resetError}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
