import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import toast from 'react-hot-toast';
import Input from '@components/Input';
import { isValidEmail } from '@utils/isValidEmail';
import images from '@static/images/register.jpg';
import { createUser } from './actions';
import classes from './style.module.scss';
import { selectRegister } from './selectors';

const Register = ({ register: SuccessRegister }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    if (!isValidEmail(data?.email)) {
      toast.error(intl.formatMessage({ id: 'app_popup_error_title ' }));
      return;
    }
    dispatch(createUser(data));
  };

  const goToLogin = () => {
    navigate('/login');
  };

  if (SuccessRegister) {
    goToLogin();
  }

  return (
    <div className={classes.login}>
      <img src={images} alt="banner" />
      <div className={classes.form}>
        <h1>
          <FormattedMessage id="modal_login_dialog_regist" />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              errors={errors}
              register={register}
              placeholder="Full Name"
              validationSchema={{
                required: 'Full Name is required',
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
              type="email"
              name="email"
              label="E-mail"
              errors={errors}
              placeholder="E-mail"
              register={register}
              validationSchema={{
                required: 'e-mail is required',
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
              validationSchema={(value) => {
                const { password } = getValues();
                return password === value || 'Passwords should match!';
              }}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              errors={errors}
              placeholder="Password"
              register={register}
              validationSchema={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Please enter a minimum of 3 characters',
                },
              }}
              required
            />
          </div>

          <button type="submit">
            <FormattedMessage id="modal_login_dialog_regist" />
          </button>
        </form>
        <div className={classes.register} onClick={() => goToLogin()}>
          <FormattedMessage id="register_have_account" />
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  register: selectRegister,
});

export default connect(mapStateToProps)(Register);
