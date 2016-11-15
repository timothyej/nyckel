import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from 'react-native-search-bar';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B3037',
    overflow: 'hidden',
    height: 44
  },
  searchBar: {
    height: 44,
    width: 350
  }
});

export default class PasswordSearch extends Component {
  constructor() {
    super(...arguments);
    this._onSearchButtonPress = this._onSearchButtonPress.bind(this);
  }

  blur() {
    this._searchBar.blur();
  }

  _onSearchButtonPress() {
    this.blur();
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <SearchBar
          ref={(ref) => {
            this._searchBar = ref

            if (this.props.initialFocus && ref) {
              ref.focus();
            }
          }}
          placeholder='Search'
          hideBackground={true}
          style={styles.searchBar}
          barStyle={'black'}
          showsCancelButton={this.props.showsCancelButton}
          onCancelButtonPress={this.props.onCancelButtonPress}
          onFocus={this.props.onFocus}
          onChangeText={this.props.onChangeText}
          onSearchButtonPress={this._onSearchButtonPress}
          tintColor={'white'}
        />
      </View>
    );
  }
}

PasswordSearch.propTypes = {
  visible: React.PropTypes.bool,
  showsCancelButton: React.PropTypes.bool,
  onCancelButtonPress: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onChangeText: React.PropTypes.func,
  initialFocus: React.PropTypes.bool
};
