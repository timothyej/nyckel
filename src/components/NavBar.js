import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#2B3037',
    paddingTop: 20,
    marginTop: 0,
    height: 64,
    alignSelf: 'stretch'
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8
  }
});

export default class NavBar extends Component {
  state = {
    visible: true,
    offset: new Animated.Value(0)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      return this._show();
    }

    if (!nextProps.visible && this.props.visible) {
      return this._hide();
    }
  }

  _slide(toValue, config) {
    var animation = Animated.timing(this.state.offset, { toValue, ...config });
    animation.start();
  }

  _show() {
    this._slide(0, { duration: 250 });
  }

  _hide() {
    this._slide(-44, { duration: 100 });
  }

  _getStyle() {
    return [
      this.props.style,
      styles.navbar,
      { marginTop: this.state.offset }
    ];
  }

  render() {
    return (
      <Animated.View style={this._getStyle()}>
        <Text style={styles.title}>Passwords</Text>
      </Animated.View>
    );
  }
}

NavBar.propTypes = {
  visible: React.PropTypes.bool
};
