import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({

});

export default class PasswordModal extends Component {
  render() {
    var name;

    if (this.props.password) {
      name = this.props.password.name;
    }

    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.visible}
      >
       <View style={{marginTop: 22}}>
        <View>
          <Text>{name}</Text>

          <TouchableHighlight onPress={this.props.onHide}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
       </View>
      </Modal>
    );
  }
}

PasswordModal.propTypes = {
  password: React.PropTypes.object,
  visible: React.PropTypes.bool,
  onHide: React.PropTypes.func
};
