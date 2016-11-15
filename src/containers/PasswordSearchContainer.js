import { connect } from 'react-redux';
import { setSearchTerm } from '../actions';
import PasswordSearch from '../components/PasswordSearch';

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeText: (text) => {
      dispatch(setSearchTerm(text));
    }
  }
};

const PasswordSearchContainer = connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(PasswordSearch);

export default PasswordSearchContainer;
