import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import formattedDate from '@utils/formattedDate';

import classes from './style.module.scss';

const Cards = ({ course, id }) => {
  const navigate = useNavigate();
  return (
    <div data-testid="Cards" className={!course.is_close ? classes.card : `${classes.card} ${classes.disabled}`}>
      <img src={course.image} alt={course?.title} />
      <div className={classes.date}>{formattedDate(course?.start_date)}</div>
      <div data-testid="cardDesc" className={classes.cardDesc}>
        <div className={classes.desc}>
          <div className={classes.title}>{course?.title}</div>
          <div className={classes.description}>{course?.description}</div>
          <div>{course?.courseInstructor?.fullName}</div>
          <div>Rp.{course?.price?.toLocaleString()}</div>
          <div className={classes.participate}>Max Participants {course?.max_participants}</div>
        </div>
        {course?.is_close ? null : (
          <div className={classes.detail} data-testid="navigate-detail" onClick={() => navigate(`/courses/${id}`)}>
            Detail Course
          </div>
        )}
      </div>
    </div>
  );
};

Cards.propTypes = {
  course: PropTypes.object,
  id: PropTypes.number,
};

export default Cards;
