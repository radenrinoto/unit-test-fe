import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ children, title, open, handleClose }) => (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={open}>
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
      </Box>
    </Fade>
  </Modal>
);

CustomModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CustomModal;
