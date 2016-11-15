import { connect } from 'react-redux';
import { exitSearchMode } from '../actions';
import SearchBackdrop from '../components/SearchBackdrop';

const mapStateToProps = (state) => {
  return {
    visible: state.inSearchMode,
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: () => {
      dispatch(exitSearchMode());
    }
  }
};

const SearchBackdropContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBackdrop);

export default SearchBackdropContainer;
