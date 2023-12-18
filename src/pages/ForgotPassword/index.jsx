import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import Input from '@components/Input';
import { createForgotPassword } from './actions';
import classes from './style.module.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(createForgotPassword(data));
  };

  return (
    <div className={classes.forgotPassword}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className={classes.btn}>
          <FormattedMessage id="btn_submit" />
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
