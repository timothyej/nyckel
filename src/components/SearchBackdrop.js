import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 44,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  backdrop: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'black'
  }
});

export default class SearchBackdrop extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  constructor() {
    super(...arguments);

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this._shouldShow(nextProps)) {
      setTimeout(this._show);
    } else {
      setTimeout(this._hide);
    }
  }

  _shouldShow(props) {
    return props.visible && !props.searchTerm;
  }

  _fade(toValue, config) {
    var animation = Animated.timing(this.state.opacity, { toValue, ...config });
    animation.start();
  }

  _show() {
    this._fade(0.2, { duration: 250 });
  }

  _hide() {
    this._fade(0, { duration: 150 });
  }

  render() {
    var pointerEvents = this._shouldShow(this.props) ? 'auto' : 'none';

    return (
      <View style={styles.container} pointerEvents={pointerEvents}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

SearchBackdrop.propTypes = {
  visible: React.PropTypes.bool,
  searchTerm: React.PropTypes.string,
  onPress: React.PropTypes.func
};
