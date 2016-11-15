import { connect } from 'react-redux';
import { deletePassword, copyPassword, showCopyNotice } from '../actions';
import PasswordRowOptions from '../components/PasswordRowOptions';

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (password) => {
      dispatch(deletePassword(password.id));
    },
    onCopy: (password) => {
      dispatch(copyPassword(password.id)).then(() => {
        dispatch(showCopyNotice(true));
      });
    }
  }
};

const PasswordRowOptionsContainer = connect(
  null,
  mapDispatchToProps
)(PasswordRowOptions);

export default PasswordRowOptionsContainer;
