import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { getCourses } from '@pages/Courses/actions';
import CustomModal from '@components/Modal';
import Input from '@components/Input';
import { updateCourseImage } from '../actions';
import classes from './style.module.scss';

const ModalUpdateImageCourse = ({ open, handleClose, payload }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(
      updateCourseImage(payload?.id, data, () => {
        handleClose();
        dispatch(getCourses());
      })
    );
  };

  return (
    <CustomModal title={`Update Image ${payload?.title}`} open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.scrollableModal}>
        <div>
          <Input
            type="file"
            name="image"
            label="Image"
            errors={errors}
            placeholder="Image"
            register={register}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </CustomModal>
  );
};

ModalUpdateImageCourse.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  payload: PropTypes.object,
};

export default ModalUpdateImageCourse;
