import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { getCourses } from '@pages/Courses/actions';
import CustomModal from '@components/Modal';
import { deleteCourse } from '../actions';

const ModalDeleteCourse = ({ open, handleClose, payload }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(
      deleteCourse(payload?.id, () => {
        dispatch(getCourses());
      })
    );
    handleClose();
  };

  return (
    <CustomModal title="Delete Course" open={open} handleClose={handleClose}>
      <h1>Are you sure ?</h1>
      <button type="button" onClick={() => onDelete()}>
        Delete
      </button>
    </CustomModal>
  );
};

ModalDeleteCourse.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  payload: PropTypes.object,
};

export default ModalDeleteCourse;
