import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Alert } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  delete: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FE3824',
    width: 75
  },
  copy: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0076FF',
    width: 75
  },
  buttonText: {
    color: 'white'
  }
});

export default class PasswordRowOptions extends Component {
  constructor() {
    super(...arguments);

    this._onDelete = this._onDelete.bind(this);
    this._onCopy = this._onCopy.bind(this);
  }

  _onDelete() {
    var password = this.props.password;

    var onDeleteHandler = () => {
      this.props.onDelete(password);
    };

    var buttons = [
      { text: 'Delete Credentials', style: 'destructive', onPress: onDeleteHandler },
      { text: 'Cancel', style: 'cancel' }
    ];

    Alert.alert(`Delete "${password.name}"?`, 'This will permanently delete the credentials.', buttons);
  }

  _onCopy() {
    var password = this.props.password;
    this.props.onCopy(password);
  }

  render() {
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={this._onDelete}>
          <View style={styles.delete}>
            <Text style={styles.buttonText}>Delete</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onCopy}>
          <View style={styles.copy}>
            <Text style={styles.buttonText}>Copy</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

PasswordRowOptions.propTypes = {
  password: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onCopy: React.PropTypes.func.isRequired
};
