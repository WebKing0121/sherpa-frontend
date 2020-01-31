import React, { Component } from 'react';
import styled from 'styled-components';
import * as Sentry from '@sentry/browser';

const Boundary = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const initialState = {
  eventId: null,
  hasError: false
};

class ErrorBoundary extends Component {
  state = { ...initialState }

  componentDidUpdate(props, prevState) {
    if (this.state === prevState) {
      this.setState(initialState);
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <Boundary data-test='error-boundary'>ERROR</Boundary>
        </ErrorWrapper>
      );
    }
    return this.props.children;
  }
};

export default ErrorBoundary;
