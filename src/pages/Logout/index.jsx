import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from './actions';

const Logout = ({ login }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());

    if (!login) {
      navigate('/login');
    }
  }, []);
};
Logout.propTypes = {
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(Logout);
