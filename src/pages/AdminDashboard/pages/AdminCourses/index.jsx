import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCourses } from '@pages/Courses/selectors';
import { getCategories, getCourses } from '@pages/Courses/actions';
import { FormattedMessage } from 'react-intl';

import CardCourse from './CardCourse';
import classes from './style.module.scss';
import ModalUpdateCourse from './ModalUpdateCourse';
import { getInstructors } from './actions';
import { selectInstructors } from './selectors';
import ModalDeleteCourse from './ModalDeleteCourse';
import ModalAddCourse from './ModalAddCourse';
import ModalUpdateImageCourse from './ModalUpdateImageCourse';

const AdminCourses = ({ courses, categories, instructors }) => {
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdateImage, setOpenUpdateImage] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCourses());
    dispatch(getInstructors());
  }, []);

  const handleOpenUpdate = (course) => {
    setSelectedCourse(course);
    setOpenUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setSelectedCourse({});
    setOpenUpdate(false);
  };

  const handleOpenDelete = (course) => {
    setSelectedCourse(course);
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setSelectedCourse({});
    setOpenDelete(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseModalAdd = () => {
    setSelectedCourse({});
    setOpenAdd(false);
  };

  const handleOpenUpdateImage = (course) => {
    setSelectedCourse(course);
    setOpenUpdateImage(true);
  };

  const handleCloseModalUpdateImage = () => {
    setSelectedCourse({});
    setOpenUpdateImage(false);
  };

  return (
    <div className={classes.adminCourses}>
      <ModalUpdateImageCourse
        open={openUpdateImage}
        handleClose={handleCloseModalUpdateImage}
        payload={selectedCourse}
      />
      <ModalAddCourse
        open={openAdd}
        handleClose={handleCloseModalAdd}
        categories={categories}
        instructors={instructors}
      />
      <ModalUpdateCourse
        open={openUpdate}
        handleClose={handleCloseModalUpdate}
        payload={selectedCourse}
        categories={categories}
        instructors={instructors}
      />
      <ModalDeleteCourse open={openDelete} handleClose={handleCloseModalDelete} payload={selectedCourse} />
      <div className={classes.wrapper}>
        <h1>
          <FormattedMessage id="admin_course" />
        </h1>
        <button className={classes.btn} type="button" onClick={() => handleOpenAdd()}>
          Add Course
        </button>
      </div>
      <div className={classes.cards}>
        {courses.map((item) => (
          <CardCourse
            key={item.id}
            id={item.id}
            course={item}
            setOpenUpdate={handleOpenUpdate}
            setOpenDelete={handleOpenDelete}
            setOpenUpdateImage={handleOpenUpdateImage}
          />
        ))}
      </div>
    </div>
  );
};

AdminCourses.propTypes = {
  courses: PropTypes.array,
  categories: PropTypes.array,
  instructors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: selectCourses,
  categories: selectCategories,
  instructors: selectInstructors,
});

export default connect(mapStateToProps)(AdminCourses);
