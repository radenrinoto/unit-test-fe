import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getCourses } from '@pages/Courses/actions';
import { selectCourses } from '@pages/Courses/selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import classes from './style.module.scss';

const Home = ({ courses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <div className={classes.home}>
      <div className={classes.homeWrapper}>
        <h1 className={classes.title}>
          <FormattedMessage id="home_title" />
        </h1>
        <div className={classes.courses}>
          <LocalLibraryIcon className={classes.icon} />
          <div className={classes.length}>
            {courses.length}++ <FormattedMessage id="admin_course" />
          </div>
        </div>c
        <div className={classes.buyNow} onClick={() => navigate('/courses')}>
          <FormattedMessage id="course_list_buy_now" />
        </div>
      </div>
    </div>
  );
};
Home.propTypes = {
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: selectCourses,
});

export default connect(mapStateToProps)(Home);
