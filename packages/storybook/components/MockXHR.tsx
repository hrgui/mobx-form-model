import * as React from 'react';

import mock from 'xhr-mock';
import { XHRMock } from 'xhr-mock/lib/XHRMock';

export interface MockXHRProps {
  onMockSetup?: (mock: XHRMock) => any;
  onMockTeardown?: (mock: XHRMock) => any;
}

export default class MockXHR extends React.Component<MockXHRProps, any> {

  componentWillMount() {
    mock.setup();
    this.props.onMockSetup && this.props.onMockSetup(mock);
  }

  componentWillUnmount() {
    this.props.onMockTeardown && this.props.onMockTeardown(mock);
    mock.teardown();
  }

  public render() {
    return (
      this.props.children
    );
  }
}
