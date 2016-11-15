import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

const mapStateToProps = (state) => {
  return {
    visible: !state.inSearchMode
  };
};

const NavBarContainer = connect(mapStateToProps)(NavBar);

export default NavBarContainer;
