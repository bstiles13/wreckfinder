import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`Error boundary caught exception: ${error} - ${errorInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return <span>Something went wrong.</span>;
    }

    return this.props.children;
  }
}
