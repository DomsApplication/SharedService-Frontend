import { useDeleteAdminObjectMutation } from "@/app/features/admin-apis/admin-object-api-slice";
import { DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import toast from "react-hot-toast";

const DeleteDataObjectDialog = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [deleteAdminObject] = useDeleteAdminObjectMutation();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // ... rest of your component

  const handleClickSubmit = async () => {
    setIsSubmitting(true);
    await deleteAdminObject(id)
      .unwrap()
      .then(() => {
        toast.success("Data Object Deleted Successfully");
      })
      .catch((error) => {
        toast.error(
          error.data.message ||
            error.data.error ||
            "Failed to Delete Data Object"
        );
      });
    setIsSubmitting(false);
    handleClose();
  };
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleOpen}>
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> Delete Data Object </DialogTitle>
        <DialogContent
          sx={{
            p: 2,
          }}
        >
          <DialogContent
            sx={{
              p: 2,
            }}
          >
            <Typography variant="subtitle1">
              Are you sure you want to delete this data object?
            </Typography>
          </DialogContent>

          <DialogActions
            sx={{
              p: 2,
              gap: 2,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isSubmitting}
              onClick={handleClickSubmit}
            >
              Continue
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

DeleteDataObjectDialog.propTypes = {
  id: PropTypes.string,
};

export default DeleteDataObjectDialog;
