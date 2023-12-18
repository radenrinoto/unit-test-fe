import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MustLoginDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const goLogin = () => {
    navigate('/login');
  };

  const goRegister = () => {
    navigate('/register');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage id="modal_login_dialog_title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage id="modal_login_dialog_desc" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goRegister}>
          <FormattedMessage id="modal_login_dialog_regist" />
        </Button>
        <Button onClick={goLogin} autoFocus>
          <FormattedMessage id="modal_login_dialog_login" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MustLoginDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default MustLoginDialog;
