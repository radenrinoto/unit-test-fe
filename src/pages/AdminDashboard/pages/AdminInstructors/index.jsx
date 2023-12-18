import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import { selectInstructors } from '../AdminCourses/selectors';
import { getInstructors } from '../AdminCourses/actions';
import classes from './style.module.scss';

const AdminInstructors = ({ instructors }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstructors());
  }, []);

  return (
    <div className={classes.adminInstructors}>
      <h1>
        <FormattedMessage id="admin_instructor" />
      </h1>
      <div className={classes.cards}>
        {instructors.map((item) => (
          <div className={classes.instructorCard}>
            <div className={classes.title}>{item?.fullName}</div>
            <div>{item?.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

AdminInstructors.propTypes = {
  instructors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  instructors: selectInstructors,
});

export default connect(mapStateToProps)(AdminInstructors);
