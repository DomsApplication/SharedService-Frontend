import { DeleteOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export default function AlertDialog({ handleClose, onDelteConfrom, deleteLableName, label, id }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // on conform delete

  const handleConformDelete = async () => {
    try {
      await onDelteConfrom(id);
      toast.success(`Deleted ${deleteLableName} Successful`);
    } catch (error) {
      console.log(error);
      toast.error(`Deleted ${deleteLableName} failed `);
    }

    setOpen(false);
    handleClose();
  };
  const handleCloseAlert = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="error" size="small" startIcon={<DeleteOutlined />} onClick={handleClickOpen}>
        Delete {label}
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Deletion Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConformDelete} autoFocus>
            Delete {label}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

AlertDialog.protoTypes = {
  label: PropTypes.string.isRequired,
  deleteLableName: PropTypes.string.isRequired,
  onDelteConfrom: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};
