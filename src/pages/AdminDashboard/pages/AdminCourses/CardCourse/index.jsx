import PropTypes from 'prop-types';
import formattedDate from '@utils/formattedDate';

import classes from './style.module.scss';

const CardCourse = ({ course, setOpenUpdate, setOpenDelete, setOpenUpdateImage }) => {
  const handleOpenUpdate = () => {
    setOpenUpdate(course);
  };

  const handleOpenDelete = () => {
    setOpenDelete(course);
  };
  const handleOpenUpdateImage = () => {
    setOpenUpdateImage(course);
  };

  return (
    <div className={!course.is_close ? classes.card : `${classes.card} ${classes.disabled}`}>
      <div onClick={() => handleOpenUpdateImage()}>
        <img src={course.image} alt={course.title} />
      </div>
      <div className={classes.date}>{formattedDate(course.start_date)}</div>
      <div className={classes.cardDesc}>
        <div className={classes.desc}>
          <div className={classes.title}>{course.title}</div>
          <div className={classes.description}>{course.description}</div>
          <div>{course?.courseInstructor?.fullName}</div>
          <div>Rp.{course?.price.toLocaleString()}</div>
          <div className={classes.participate}>Max Participants {course.max_participants}</div>
        </div>
        {course.is_close ? null : (
          <div className={classes.actions}>
            <div className={classes.detail} onClick={() => handleOpenUpdate()}>
              Update
            </div>
            <div className={classes.detail} onClick={() => handleOpenDelete()}>
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CardCourse.propTypes = {
  course: PropTypes.object,
  setOpenDelete: PropTypes.func,
  setOpenUpdate: PropTypes.func,
  setOpenUpdateImage: PropTypes.func,
};

export default CardCourse;
