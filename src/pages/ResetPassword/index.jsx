import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '@components/Input';
import images from '@static/images/login.jpg';
import classes from './style.module.scss';
import { resetPassword } from './actions';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(
      resetPassword(token, data, () => {
        navigate('/login');
      })
    );
  };

  return (
    <div className={classes.login}>
      <img src={images} alt="banner" />
      <div className={classes.form}>
        <h1>
          <FormattedMessage id="reset_password" />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="password"
              name="password"
              label="New Password"
              errors={errors}
              register={register}
              placeholder="New Password"
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
          <div>
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              errors={errors}
              placeholder="Confirm Password"
              register={register}
              validationSchema={{
                required: 'confirm password is required',
                minLength: {
                  value: 3,
                  message: 'Please enter a minimum of 3 characters',
                },
              }}
              required
            />
          </div>

          <button type="submit">
            <FormattedMessage id="btn_submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
