import React, { Component } from 'react';
import { StyleSheet, View, ListView } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import PasswordSearch from '../components/PasswordSearch';
import PasswordRow from '../components/PasswordRow';
import PasswordRowOptionsContainer from '../containers/PasswordRowOptionsContainer';
import SearchBackdropContainer from '../containers/SearchBackdropContainer';
import PasswordSearchContainer from '../containers/PasswordSearchContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  list: {
    alignSelf: 'stretch'
  }
});

export default class PasswordList extends Component {
  state = {
    inSearchMode: false,
    filteredPasswords: null
  };

  constructor() {
    super(...arguments);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._exitSearch = this._exitSearch.bind(this);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  _filterPasswords(passwords, searchTerm) {
    var items = passwords.items || {};
    var ids = Object.keys(items);
    var filtered = {};

    function isMatch(object, needle) {
      if (!object) {
        return false;
      }

      var lowercaseNeedle = needle.toLowerCase();
      var keys = Object.keys(object);

      return keys.some((key) => {
        var value = object[key];
        var lowercaseValue = typeof value === 'string' ? value.toLowerCase() : '';

        return lowercaseValue.indexOf(lowercaseNeedle) > -1;
      });
    }

    if (!searchTerm || ids.length === 0) {
      return this.setState({
        filteredPasswords: null
      });
    }

    ids.forEach((id) => {
      var password = items[id];

      if (isMatch(password, searchTerm)) {
        filtered[id] = password;
      }
    });

    this.setState({
      filteredPasswords: filtered
    });
  }

  componentWillReceiveProps(nextProps) {
    var props = this.props;
    var updateFilteredPasswords = false;

    if (nextProps.inSearchMode === false && props.inSearchMode === true) {
      // Search Mode was exited externally - exit internally too.
      this._searchBar.getWrappedInstance().blur();
      this._exitSearch(true);
    }

    if (nextProps.searchTerm !== props.searchTerm) {
      updateFilteredPasswords = true;
    }

    if (props.searchTerm && nextProps.passwords !== props.passwords) {
      updateFilteredPasswords = true;
    }

    if (updateFilteredPasswords) {
      // Update filtered passwords.
      this._filterPasswords(nextProps.passwords, nextProps.searchTerm);
    }
  }

  shouldComponentUpdate(nextProps) {
    // Don't update if it's an external event about Search Mode being exited.
    // (We will take care of it internally due to performance in animations.)
    return nextProps.inSearchMode === this.props.inSearchMode;
  }

  _exitSearch(silent) {
    if (!silent) {
      this.props.onSearchCancel();
    }

    setTimeout(() => {
      this.setState({ inSearchMode: false });
    }, 300);
  }

  _onTouchStart() {
    var swipeListView = this.swipeListView;

    if (swipeListView && swipeListView.openCellId) {
      swipeListView.safeCloseOpenRow();
      swipeListView.openCellId = null;
    }
  }

  _renderHeader() {
    return (
      <PasswordSearch
        visible={!this.state.inSearchMode}
        onFocus={() => {
          setTimeout(() => {
            this.props.onSearchFocus();
          });

          this.setState({ inSearchMode: true });
        }}
      />
    );
  }

  _renderRow(rowData, secId, rowId, rowMap) {
    var passwordIndex = this._passwordIndex;
    var style;

    if (passwordIndex.indexOf(rowData.id) < passwordIndex.length - 1) {
      style = {
        borderBottomWidth: 0.5,
        borderColor: '#f2f2f2'
      };
    }

    return (
      <SwipeRow disableLeftSwipe={true} leftOpenValue={150} style={style}>
        <PasswordRowOptionsContainer password={rowData} />
        <PasswordRow password={rowData} onShowPassword={this.props.onShowPassword} />
      </SwipeRow>
    );
  }

  render() {
    const passwords = this.props.passwords;
    const items = this.state.filteredPasswords || passwords.items || {};
    const dataSource = this.dataSource.cloneWithRows(items);

    this._passwordIndex = Object.keys(items);

    return (
      <View style={styles.container}>
        <PasswordSearchContainer
          ref={(ref) => this._searchBar = ref}
          visible={this.state.inSearchMode}
          initialFocus={true}
          showsCancelButton={true}
          onCancelButtonPress={this._exitSearch}
        />
        <SwipeListView
          ref={(ref) => this.swipeListView = ref}
          style={styles.list}
          dataSource={dataSource}
          renderHeader={this._renderHeader}
          renderRow={this._renderRow}
          onTouchStart={this._onTouchStart}
          contentOffset={{y: 44}}
        />
        <SearchBackdropContainer />
      </View>
    );
  }
}

PasswordList.propTypes = {
  passwords: React.PropTypes.object,
  searchTerm: React.PropTypes.string,
  onSearchFocus: React.PropTypes.func,
  onSearchCancel: React.PropTypes.func,
  onShowPassword: React.PropTypes.func
};
