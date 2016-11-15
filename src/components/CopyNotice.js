import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { VibrancyView } from 'react-native-blur';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notice: {
    height: 114,
    width: 114,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default class CopyNotice extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  constructor() {
    super(...arguments);

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this._show();
      setTimeout(this._hide, 1300);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  _fade(toValue, config) {
    var animation = Animated.timing(this.state.opacity, { toValue, ...config });
    animation.start();
  }

  _show() {
    this.state.opacity.setValue(0);
    this._fade(1, { duration: 300 });
  }

  _hide() {
    this._fade(0);
    this.props.onHide();
  }

  render() {
    return (
      <View style={styles.container} pointerEvents={'none'}>
        <Animated.View style={{ opacity: this.state.opacity }}>
          <VibrancyView blurType={'dark'} style={styles.notice}>
            <Text style={styles.text}>Copied!</Text>
          </VibrancyView>
        </Animated.View>
      </View>
    );
  }
}

CopyNotice.propTypes = {
  visible: React.PropTypes.bool,
  onHide: React.PropTypes.func
};
