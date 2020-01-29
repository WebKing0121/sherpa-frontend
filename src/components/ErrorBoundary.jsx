import React, { Component } from 'react';
import styled from 'styled-components';

const Boundary = styled.div`
  font-size: 2rem;
  text-align: center;
`;

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <Boundary data-test='error-boundary'>ERROR</Boundary>;

    return this.props.children;
  }
};

export default ErrorBoundary;
