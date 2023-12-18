import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import decodeToken from '@utils/decodeToken';
import { selectLogin, selectToken } from '@containers/Client/selectors';
import { getCourse, createTransaction, createParticipant, updateStatustransaction } from './actions';
import { selectCourse } from './selector';
import classes from './style.module.scss';
import MustLoginDialog from './MustLoginDialog';

const CourseDetail = ({ course, login, token: tokenUser }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = tokenUser ? decodeToken(tokenUser) : null;

  useEffect(() => {
    dispatch(getCourse(id));
  }, [dispatch, id]);

  const navigateTo = (courseId) => {
    if (login) {
      return dispatch(
        createTransaction({ courseId }, (orderId, token) => {
          dispatch(
            updateStatustransaction(orderId, token, () => {
              dispatch(createParticipant(courseId));
            })
          );
        })
      );
    }
    setOpen(true);
  };

  return (
    <>
      <MustLoginDialog open={open} setOpen={setOpen} />
      <div className={classes.courseDetail}>
        <div className={classes.contents}>
          <div className={classes.contentsWrapper}>
            <div className={classes.category}>{course?.courseCategory?.name}</div>
            <div className={classes.title}>{course?.title}</div>
            <div className={classes.instructor}>
              <FormattedMessage id="admin_instructor" /> {course?.courseInstructor?.fullName}
            </div>
            <div className={classes.description}>{course?.description}</div>
            <div className={classes.qualified}>
              <div className={classes.titleQualified}>
                <FormattedMessage id="qualified" />
              </div>
              <div>{course?.qualified}</div>
            </div>
            <div>Rp.{course?.price?.toLocaleString()}</div>
          </div>
          {user?.role_id !== 1 ? (
            <div className={classes.btn} onClick={() => navigateTo(course?.id)}>
              <FormattedMessage id="course_list_buy_now" />
            </div>
          ) : null}
        </div>
        <img src={course?.image} alt={course?.title} />
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  course: selectCourse,
  login: selectLogin,
  token: selectToken,
});

CourseDetail.propTypes = {
  course: PropTypes.object,
  login: PropTypes.bool,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(CourseDetail);
