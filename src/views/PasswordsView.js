import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import NavBarContainer from '../containers/NavBarContainer';
import CopyNoticeContainer from '../containers/CopyNoticeContainer';
import PasswordListContainer from '../containers/PasswordListContainer';
import PasswordModalContainer from '../containers/PasswordModalContainer';

const styles = StyleSheet.create({
  passwordsView: {
    backgroundColor: '#f4f5f7'
  }
});

export default class PasswordsView extends Component {
  render() {
    return (
      <View style={[this.props.style, styles.passwordsView]}>
        <NavBarContainer />
        <PasswordListContainer />
        <CopyNoticeContainer />
        <PasswordModalContainer />
      </View>
    );
  }
}
