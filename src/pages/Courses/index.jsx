import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import filter from 'lodash/filter';
import { FormattedMessage } from 'react-intl';

import { getCategories, getCourses } from './actions';
import { selectCategories, selectCourses } from './selectors';
import Cards from '../../components/Cards';
import classes from './style.module.scss';

const Courses = ({ courses, categories }) => {
  const dispatch = useDispatch();
  const [valueCourse, setValueCourse] = useState('');
  const [filterByCategory, setFilterByCategory] = useState(null);
  const [cardsBySearch, setCardsBySearch] = useState([]);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length === 0 || courses.length === 0) {
      return;
    }

    const filteredByCategory = filter(courses, (course) => course.category_id === filterByCategory);

    if (!filteredByCategory || filterByCategory === null) {
      setCardsBySearch(courses);
    } else {
      const filteredBySearch = filter(filteredByCategory, (course) =>
        course.title.toLowerCase().includes(valueCourse.toLowerCase())
      );
      setCardsBySearch(filteredBySearch);
    }
  }, [valueCourse, filterByCategory, courses, categories]);

  return (
    <div className={classes.courses}>
      <h1>
        <FormattedMessage id="admin_course" />
      </h1>
      <div>
        <input
          className={classes.input}
          placeholder="Search Course"
          value={valueCourse}
          onChange={(e) => setValueCourse(e.target.value)}
        />
      </div>
      <div className={classes.listCategory}>
        <div
          onClick={() => setFilterByCategory(null)}
          className={`${filterByCategory !== null ? classes.category : `${classes.category} ${classes.active}`}`}
        >
          All
        </div>
        {categories.map((item) => (
          <div
            key={item.id}
            onClick={() => setFilterByCategory(item.id)}
            className={`${filterByCategory !== item.id ? classes.category : `${classes.category} ${classes.active}`}`}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className={classes.cards}>
        {cardsBySearch.length > 0 ? (
          cardsBySearch.map((course) => <Cards key={course.id} course={course} id={course.id} />)
        ) : (
          <p>
            <FormattedMessage id="course_no_available" />
          </p>
        )}
      </div>
    </div>
  );
};

Courses.propTypes = {
  courses: PropTypes.array,
  categories: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: selectCourses,
  categories: selectCategories,
});

export default connect(mapStateToProps)(Courses);
