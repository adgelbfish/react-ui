import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';
import getDisplayName from '../utils/getDisplayName';
import shallowEqual from '../utils/shallowEqual';

export default function container(specs) {
  return DecoratedComponent => {
    const displayName = `AdrenalineContainer(${getDisplayName(DecoratedComponent)})`;

    invariant(
      specs !== null && specs !== undefined,
      `${displayName} requires configuration.`
    );

    invariant(
      typeof specs.query === 'string',
      `You have to define 'query' as a string in ${displayName}.`
    );

    invariant(
      !specs.variables || typeof specs.variables === 'function',
      `You have to define 'variables' as a function in ${displayName}.`
    );

    function mapPropsToVariables(props) {
      return !!specs.variables ? specs.variables(props) : {};
    }

    return class extends Component {
      static displayName = displayName
      static DecoratedComponent = DecoratedComponent

      static contextTypes = {
        fetchDoneCallback: PropTypes.func,
        fetchBeforeRender: PropTypes.bool,
        initialData: PropTypes.object,
        query: PropTypes.func,
        mutate: PropTypes.func,
      }

      static getSpecs() {
        return specs;
      }

      constructor(props, context) {
        super(props, context);

        this.state = {
          initialDataProvided: context.initialData ? true : false,
          data: context.initialData ? context.initialData : null,
          isFetching: context.initialData ? false : true,
        };
      }

      componentWillMount() {
        if (!this.state.initialDataProvided) {
          this.query();
        }
      }

      componentWillReceiveProps(nextProps) {
        if (!shallowEqual(this.props, nextProps)) {
          this.query(nextProps);
        }
      }

      query = (props = this.props, passBackPromise = false) => {
        const { query } = specs;
        const variables = mapPropsToVariables(props);
        if (this.context.fetchBeforeRender) {
          return this.context.query(query, variables).then(this.context.fetchDoneCallback);
        }
        this.setState({ isFetching: true }, () => {
          this.context.query(query, variables)
            .catch(err => {
              console.error('Error in query', err); // eslint-disable-line
            })
            .then(data => {
              this.context.fetchDoneCallback(data);
              this.setState({ data, isFetching: false });
            });
        });
      }

      mutate = ({ mutation = '', variables = {}, files = null, invalidate = true }) => {
        return this.context.mutate(mutation, variables, files)
          .then(() => {
            if (invalidate) {
              this.query();
            }
          });
      }

      render() {
        const { data, isFetching } = this.state;
        const variables = mapPropsToVariables(this.props);

        const dataOrDefault = !data ? {} : data;

        return (
          <DecoratedComponent
            {...this.props}
            {...dataOrDefault}
            isFetching={isFetching}
            mutate={this.mutate}
            variables={variables} />
        );
      }
    };
  };
}
