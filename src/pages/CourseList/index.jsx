import { selectCourses } from '@pages/Courses/selectors';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import find from 'lodash/find';
import { useNavigate } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import Cards from '@components/Cards';
import { getMyCourse } from './actions';
import { selectMyCourse } from './selectors';
import classes from './style.module.scss';

const CourseList = ({ courses, myCourse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyCourse());
  }, []);

  const enrolledCoursesDetails = myCourse?.map((enrolledCourse) => {
    const courseDetails = find(courses, { id: enrolledCourse.course_id }) || {};
    return { ...courseDetails, ...enrolledCourse };
  });

  return (
    <div className={classes.myCourse}>
      <h1>My Courses</h1>
      <div className={classes.coursesList}>
        {enrolledCoursesDetails.length !== 0 ? (
          enrolledCoursesDetails?.map((item) => <Cards key={item.id} course={item} id={item.course_id} />)
        ) : (
          <div className={classes.courseZero}>
            <h1>
              <FormattedMessage id="course_list" />
            </h1>
            <span className={classes.buyNow} onClick={() => navigate('/courses')}>
              <FormattedMessage id="course_list_buy_now" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array,
  myCourse: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: selectCourses,
  myCourse: selectMyCourse,
});

export default connect(mapStateToProps)(CourseList);
