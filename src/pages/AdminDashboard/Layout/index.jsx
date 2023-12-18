import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import decodeToken from '@utils/decodeToken';
import { selectToken } from '@containers/Client/selectors';
import Sidebar from '../Components/Sidebar';
import classes from './style.module.scss';

const LayoutAdmin = ({ children, token }) => {
  const navigate = useNavigate();
  const user = token ? decodeToken(token) : null;

  useEffect(() => {
    if (user?.role_id !== 1) {
      return navigate('/');
    }
  }, []);

  return (
    <div className={classes.layoutAdmin}>
      <Sidebar />
      {children}
    </div>
  );
};
LayoutAdmin.propTypes = {
  children: PropTypes.node,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(LayoutAdmin);
