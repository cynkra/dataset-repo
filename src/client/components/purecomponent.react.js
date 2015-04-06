import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

export default class PureComponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }
}
