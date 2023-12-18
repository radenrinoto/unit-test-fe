import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createStructuredSelector } from 'reselect';

import decodeToken from '@utils/decodeToken';
import { selectLogin, selectToken } from '@containers/Client/selectors';
import { setLocale } from '@containers/App/actions';

import classes from './style.module.scss';

const URL_LINK = [
  {
    id: 'navbar_home',
    path: '/',
  },
  {
    id: 'navbar_courses',
    path: '/courses',
  },
];

const Navbar = ({ title, locale, login, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  const user = token ? decodeToken(token) : null;

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  const goLogout = () => {
    navigate('/logout');
  };

  const goLogin = () => {
    navigate('/login');
  };

  const goRegister = () => {
    navigate('/register');
  };

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.contentMiddle}>
          {URL_LINK.map((url) => (
            <div
              key={url.id}
              className={
                location.pathname === url.path ? `${classes.middleLink} ${classes.active}` : classes.middleLink
              }
              onClick={() => goTo(url.path)}
            >
              <FormattedMessage id={url.id} />
            </div>
          ))}
        </div>
        {!login ? (
          <div className={classes.isLogin}>
            {location.pathname === '/login' ? (
              <div className={classes.login} onClick={goRegister}>
                <FormattedMessage id="navbar_register" />
              </div>
            ) : (
              <div className={classes.login} onClick={goLogin}>
                <FormattedMessage id="navbar_login" />
              </div>
            )}
            <div className={classes.toolbar}>
              <div className={classes.toggle} onClick={handleClick}>
                <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
                <div className={classes.lang}>{locale}</div>
                <ExpandMoreIcon />
              </div>
            </div>
            <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
              <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
                <div className={classes.menu}>
                  <Avatar className={classes.menuAvatar} src="/id.png" />
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_lang_id" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
                <div className={classes.menu}>
                  <Avatar className={classes.menuAvatar} src="/en.png" />
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_lang_en" />
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={classes.toolbar}>
            <div className={classes.toggle} onClick={handleClick}>
              <Avatar className={classes.avatar} src={AccountCircleIcon} />
              <div className={classes.fullName}>{user?.fullName}</div>
              <ExpandMoreIcon />
            </div>
            <Menu className={classes.menuMUI} open={open} anchorEl={menuPosition} onClose={handleClose}>
              <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
                <div className={classes.menu}>
                  <Avatar className={classes.menuAvatar} src="/id.png" />
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_lang_id" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
                <div className={classes.menu}>
                  <Avatar className={classes.menuAvatar} src="/en.png" />
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_lang_en" />
                  </div>
                </div>
              </MenuItem>
              {user?.role_id !== 1 ? (
                <MenuItem onClick={() => goTo('/my-course')}>
                  <FormattedMessage id="navbar_my_courses" />
                </MenuItem>
              ) : (
                <MenuItem onClick={() => goTo('/admin-dashboard/courses')}>
                  <FormattedMessage id="navbar_isAdmin" />
                </MenuItem>
              )}
              <MenuItem onClick={() => goLogout()}>
                <FormattedMessage id="navbar_logout" />
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
});

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  login: PropTypes.bool,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(Navbar);
