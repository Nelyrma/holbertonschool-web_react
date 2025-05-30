import React from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLoggingHOC extends React.Component {
    componentDidMount() {
      console.log(`Component ${getDisplayName(WrappedComponent)} is mounted`);
    }

    componentWillUnmount() {
      console.log(
        `Component ${getDisplayName(WrappedComponent)} is going to unmount`
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // Helper to determine display name
  const getDisplayName = (Component) =>
    Component.displayName || Component.name || 'Component';

  WithLoggingHOC.displayName = `WithLogging(${getDisplayName(WrappedComponent)})`;

  return WithLoggingHOC;
};

export default WithLogging;
