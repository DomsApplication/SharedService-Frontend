import { EditOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import EditDataObjectForm from "./edit-data-object-form";

const EditDataObjectDialog = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> Edit Data Object </DialogTitle>
        <DialogContent
          sx={{
            p: 2,
          }}
        >
          <EditDataObjectForm id={id} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
EditDataObjectDialog.propTypes = {
  id: PropTypes.string.isRequired,
};
export default EditDataObjectDialog;
