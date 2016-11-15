import { connect } from 'react-redux';
import { showCopyNotice } from '../actions';
import CopyNotice from '../components/CopyNotice';

const mapStateToProps = (state) => {
  return {
    visible: state.showCopyNotice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(showCopyNotice(false));
    }
  }
};

const CopyNoticeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyNotice);

export default CopyNoticeContainer;
