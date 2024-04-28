import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DynamicForm from "../form-components/DynamicForms";
import { arrayOf, bool, func, object, string } from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "85%", md: "70%", lg: "60%" },

  bgcolor: "background.paper",
  border: "2px solid  primary ",
  borderRadius: "1rem",
  boxShadow: 24,
  p: { xs: 2, Cm: 4, md: 6, lg: 8 },
  maxHeight: "90vh",
  overflowY: "auto",
  whiteSpace: "stable",
  flexDirection: "column",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  gap: 4,
};

const AddEditEntry = ({ label, onClose, onOpen, open, itemform, id, onSubmitEdit, onSubmitCreate, initialValues }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add {label}
          </Typography>

          <DynamicForm
            formConfig={{ items: itemform }}
            label={label}
            id={id}
            onSubmitEdit={onSubmitEdit}
            onSubmitCreate={onSubmitCreate}
            onClose={onClose}
            initialValues={initialValues}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            add all the fields are required
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
AddEditEntry.propTypes = {
  itemform: arrayOf(object).isRequired,

  label: string.isRequired,
  onClose: func.isRequired,
  onOpen: func.isRequired,
  open: bool.isRequired,
  id: string,
  onSubmitCreate: func.isRequired,
  onSubmitEdit: func.isRequired,
  initialValues: object,
};

export default AddEditEntry;
