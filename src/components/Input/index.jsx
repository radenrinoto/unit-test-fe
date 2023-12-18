import PropTypes from 'prop-types';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import classes from './style.module.scss';

const Input = ({ defaultValue, name, label, register, errors, type, validationSchema, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className={classes.input} data-testid="Input">
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <div className={classes.contentInput}>
        <input
          id={name}
          name={name}
          defaultValue={defaultValue}
          type={isPasswordVisible ? 'text' : type}
          {...register(name, validationSchema)}
          placeholder={placeholder}
        />
        {name === 'password' && (
          <div onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <VisibilityOffIcon className={classes.icon} />
            ) : (
              <VisibilityIcon className={classes.icon} />
            )}
          </div>
        )}
      </div>
      {errors && errors[name] && errors[name]?.type === 'required' && (
        <span className="error">{errors[name]?.message}</span>
      )}
      {errors && errors[name] && errors[name]?.type === 'minLength' && (
        <span className="error">{errors[name]?.message}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  type: PropTypes.string.isRequired,
  validationSchema: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};
export default Input;
