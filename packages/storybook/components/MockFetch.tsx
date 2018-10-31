import * as React from 'react';

import * as fetchMock from 'fetch-mock';

export interface MockFetchProps {
  onMockSetup?: (mock) => any;
  onMockTeardown?: (mock) => any;
}

export default class MockFetch extends React.Component<MockFetchProps, any> {

  componentWillMount() {
    this.props.onMockSetup && this.props.onMockSetup(fetchMock);
  }

  componentWillUnmount() {
    this.props.onMockTeardown && this.props.onMockTeardown(fetchMock);
    fetchMock.restore();
  }

  public render() {
    return (
      this.props.children
    );
  }
}
