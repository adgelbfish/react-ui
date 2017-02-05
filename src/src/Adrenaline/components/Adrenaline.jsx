import React, { Component, PropTypes } from 'react';

import defaultNetworkLayer from '../network/defaultNetworkLayer';


export default class Adrenaline extends Component {
  static childContextTypes = {
    fetchDoneCallback: PropTypes.func,
    fetchBeforeRender: PropTypes.bool,
    initialData: PropTypes.object,
    query: PropTypes.func,
    mutate: PropTypes.func,
  }

  static propTypes = {
    fetchDoneCallback: PropTypes.func,
    fetchBeforeRender: PropTypes.bool,
    initialData: PropTypes.object,
    endpoint: PropTypes.string,
    networkLayer: PropTypes.object,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    endpoint: '/graphql',
    networkLayer: defaultNetworkLayer,
  }

  getChildContext() {
    let { endpoint, networkLayer, fetchDoneCallback, fetchBeforeRender, initialData } = this.props;
    fetchDoneCallback = fetchDoneCallback ? fetchDoneCallback : f => f;
    return {
      fetchDoneCallback, fetchBeforeRender, initialData,
      query: (query, variables) => {
        return networkLayer.performQuery(endpoint, query, variables);
      },
      mutate: (...args) => {
        return networkLayer.performMutation(endpoint, ...args);
      },
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
