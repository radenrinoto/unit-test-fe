import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import classes from './style.module.scss';

const URL = [
  {
    id: 'admin_course',
    icon: <MenuBookIcon />,
    path: '/admin-dashboard/courses',
  },
  {
    id: 'admin_instructor',
    icon: <SupervisorAccountIcon />,
    path: '/admin-dashboard/instructor',
  },
  {
    id: 'admin_students',
    icon: <GroupIcon />,
    path: '/admin-dashboard/students',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className={classes.sideBar}>
      {URL.map((link) => (
        <div className={classes.link} onClick={() => goTo(link.path)}>
          {link.icon}
          <div className={classes.linkTitle}>
            <FormattedMessage key={link.id} id={link.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
