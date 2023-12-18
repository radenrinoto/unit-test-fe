import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Dialog } from '@mui/material';

import classes from './style.module.scss';

// eslint-disable-next-line arrow-body-style
const PopupMessage = ({ open, title, message, onClose }) => {
  return (
    <Dialog data-testid="popup-message" open={open} onClose={onClose} PaperProps={{ className: classes.dialogWrapper }}>
      <div data-testid="popup-title" className={classes.title}>
        <FormattedMessage id={title || 'app_popup_error_title'} />
      </div>
      <div data-testid="message" className={classes.message}>
        <FormattedMessage id={message || 'app_popup_error_message'} />
      </div>
      <button data-testid="button" type="button" onClick={onClose} className={classes.button}>
        <FormattedMessage id="app_popup_close_button_label" />
      </button>
    </Dialog>
  );
};

PopupMessage.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default PopupMessage;
