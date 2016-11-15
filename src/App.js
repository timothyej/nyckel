import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Swiper from 'react-native-swiper';

import PasswordsView from './views/PasswordsView';
import CameraView from './views/CameraView';
import store from './store';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
});

export default class App extends Component {
  constructor() {
    super(...arguments);

    this._onResponderGrant = this._onResponderGrant.bind(this);
    this._onResponderMove = this._onResponderMove.bind(this);
    this._onResponderRelease = this._onResponderRelease.bind(this);
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    this._onScroll = this._onScroll.bind(this);

    StatusBar.setHidden(true);
    StatusBar.setBarStyle('light-content');
  }

  _onResponderGrant(event) {
    this._grantTouchEvent = event.nativeEvent;
  }

  _onResponderMove(event) {
    var grantEvent = this._grantTouchEvent;

    if (grantEvent && grantEvent.contentOffset && grantEvent.contentOffset.x > 0) {
      StatusBar.setHidden(true);
    }
  }

  _onResponderRelease() {
    if (this._contentOffsetX === 0) {
      StatusBar.setHidden(false, 'fade');
    }
  }

  _onMomentumScrollEnd(event, state) {
    if (state.index === 0) {
      StatusBar.setHidden(false, 'fade');
    }
  }

  _onScroll(event) {
    this._contentOffsetX = event.nativeEvent.contentOffset.x;
  }

  render() {
    return (
      <Provider store={store}>
        <View>
          <Swiper
            ref={(ref) => this._swiper = ref}
            index={1}
            loop={false}
            showsPagination={false}
            onResponderGrant={this._onResponderGrant}
            onResponderMove={this._onResponderMove}
            onResponderRelease={this._onResponderRelease}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            onScroll={this._onScroll}
            scrollEventThrottle={16}
          >
            <PasswordsView style={styles.view} />
            <CameraView style={styles.view} />
          </Swiper>
        </View>
      </Provider>
    );
  }
}
