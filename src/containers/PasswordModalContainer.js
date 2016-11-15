import { connect } from 'react-redux';
import { showPassword } from '../actions';
import PasswordModal from '../components/PasswordModal';

const mapStateToProps = (state) => {
  return {
    visible: Boolean(state.showPassword),
    password: state.showPassword
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(showPassword(null));
    }
  }
};

const PasswordModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordModal);

export default PasswordModalContainer;
