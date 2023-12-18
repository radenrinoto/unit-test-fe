import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectLogin } from '@containers/Client/selectors';
import toast from 'react-hot-toast';
import Input from '@components/Input';
import { isValidEmail } from '@utils/isValidEmail';
import images from '@static/images/login.jpg';
import { loginUser } from './actions';
import classes from './style.module.scss';

const Login = ({ login }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login]);

  const onSubmit = (data) => {
    if (!isValidEmail(data?.email)) {
      toast.error(intl.formatMessage({ id: 'app_popup_error_title ' }));
      return;
    }
    dispatch(loginUser(data));
  };

  const goToRegister = () => {
    navigate('/register');
  };
  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={classes.login}>
      <img src={images} alt="banner" />
      <div className={classes.form}>
        <h1>
          <FormattedMessage id="modal_login_dialog_login" />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="email"
              label="Email"
              errors={errors}
              register={register}
              placeholder="E-mail"
              validationSchema={{
                required: 'Email is required',
                minLength: {
                  value: 3,
                  message: 'Please enter a minimum of 3 characters',
                },
              }}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              errors={errors}
              placeholder="Password"
              register={register}
              validationSchema={{
                required: 'password is required',
                minLength: {
                  value: 3,
                  message: 'Please enter a minimum of 3 characters',
                },
              }}
              required
            />
          </div>

          <button type="submit">
            <FormattedMessage id="modal_login_dialog_login" />
          </button>
        </form>
        <div className={classes.register} onClick={() => goToRegister()}>
          <FormattedMessage id="login_dont_account" />
        </div>
        <div className={classes.register} onClick={() => goToForgotPassword()}>
          <FormattedMessage id="login_forgot_password" />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(Login);
