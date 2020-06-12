import React from 'react';
import { TextInput } from 'react-native';
import { debounce } from 'lodash';

import { LOOKUP_DEBOUNCE } from '../../constants/uiConstants';

import styles from './styles';

const withLookupField = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: undefined,
        delayedValue: undefined,
      };
      const debounceTime = props.debounceTime !== undefined ? props.debounceTime : LOOKUP_DEBOUNCE;
      this.debouncedChangeHandler = debounce(delayedValue => this.setState({ delayedValue }), debounceTime);
    }

    handleChange = value => {
      this.setState({ value });
      this.debouncedChangeHandler(value);
    };

    render() {
      return (
        <>
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleChange}
            value={this.state.value}
            clearButtonMode="while-editing"
            placeholder="Search..."
          />
          <Component {...this.props} searchTerm={this.state.delayedValue}/>
        </>
      );
    }
  };

export default withLookupField;