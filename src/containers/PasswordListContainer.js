import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPasswords, savePassword, showPassword, enterSearchMode, exitSearchMode } from '../actions';
import PasswordList from '../components/PasswordList';

export default class PasswordListContainer extends Component {
  constructor() {
    super(...arguments);

    this._onSearchFocus = this._onSearchFocus.bind(this);
    this._onSearchCancel = this._onSearchCancel.bind(this);
    this._onShowPassword = this._onShowPassword.bind(this);
  }

  componentDidMount() {
    var dispatch = this.props.dispatch;
    dispatch(getPasswords());
  }

  _onSearchFocus() {
    var dispatch = this.props.dispatch;

    setTimeout(() => {
      dispatch(enterSearchMode());
    });
  }

  _onSearchCancel() {
    var dispatch = this.props.dispatch;

    setTimeout(() => {
      dispatch(exitSearchMode());
    });
  }

  _onShowPassword(password) {
    var dispatch = this.props.dispatch;
    dispatch(showPassword(password));
  }

  render() {
    return (
      <PasswordList
        passwords={this.props.passwords}
        inSearchMode={this.props.inSearchMode}
        searchTerm={this.props.searchTerm}
        onSearchFocus={this._onSearchFocus}
        onSearchCancel={this._onSearchCancel}
        onShowPassword={this._onShowPassword}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    passwords: state.passwords,
    inSearchMode: state.inSearchMode,
    searchTerm: state.searchTerm
  };
};

const PasswordListConnector = connect(
  mapStateToProps
)(PasswordListContainer);

export default PasswordListConnector;
