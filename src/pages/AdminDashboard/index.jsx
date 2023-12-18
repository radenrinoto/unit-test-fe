// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import LayoutAdmin from './Layout';
import AdminStudents from './pages/AdminStudents';
import AdminInstructors from './pages/AdminInstructors';
import AdminCourses from './pages/AdminCourses';

const AdminDashboard = () => {
  const { params } = useParams();

  let childrenAdmin;

  if (params === 'courses') {
    childrenAdmin = <AdminCourses />;
  }
  if (params === 'instructor') {
    childrenAdmin = <AdminInstructors />;
  }
  if (params === 'students') {
    childrenAdmin = <AdminStudents />;
  }

  return <LayoutAdmin>{childrenAdmin}</LayoutAdmin>;
};

AdminDashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(AdminDashboard);
