import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 25
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 2,
    color: '#030303'
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
    color: '#8F8E94'
  }
});

export default class PasswordRow extends Component {
  constructor() {
    super(...arguments);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    var onShowPassword = this.props.onShowPassword;

    if (onShowPassword) {
      onShowPassword(this.props.password);
    }
  }

  render() {
    var password = this.props.password;

    return (
      <TouchableHighlight style={styles.row} underlayColor={'#f4f5f7'} onPress={this._onPress}>
        <View>
          <Text style={styles.title}>{password.name}</Text>
          <Text style={styles.text}>{password.username}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

PasswordRow.propTypes = {
  password: React.PropTypes.object.isRequired,
  onShowPassword: React.PropTypes.func
};
