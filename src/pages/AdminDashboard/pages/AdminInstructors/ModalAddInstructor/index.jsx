import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import Input from '@components/Input';
import classes from './style.module.scss';

const ModalAddInstructor = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => data;

  return (
    <div className={classes.login}>
      <div className={classes.form}>
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
      </div>
    </div>
  );
};

export default ModalAddInstructor;
