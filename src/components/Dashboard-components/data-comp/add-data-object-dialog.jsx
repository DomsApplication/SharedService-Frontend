import { useCreateAdminObjectMutation } from "@/app/features/admin-apis/admin-object-api-slice";
import { AddOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Paper,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

const AddDataObjectDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [createAdminObject] = useCreateAdminObjectMutation();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    title: yup
      .string()
      .matches(
        /^[A-Za-z0-9_ ]*$/,
        "Title must be alphanumeric, can include underscores and spaces",
      )
      .min(3, "Title must be at least 3 characters")
      .max(64, "Tile must be at most 64 characters")
      .required("Title is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(400, "Description must be at most 400 characters"),
    entity: yup.string().required("Entity is required"),
    version: yup.number().required("Version is required"),
  });

  // ... rest of your component

  const intialData = {
    title: "",
    description: "",
    entity: "",
    version: 1,
  };
  return (
    <div>
      <Button
        startIcon={<AddOutlined />}
        variant="contained"
        onClick={handleOpen}
      >
        Add Data Object
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> Add Data Object </DialogTitle>
        <DialogContent
          sx={{
            p: 2,
          }}
        >
          <DialogContentText>Add Data Object here</DialogContentText>

          <Formik
            initialValues={intialData}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              await createAdminObject({ ...values, type: "object" })
                .unwrap()
                .then((data) => toast.success(data.message))
                .catch((error) =>
                  toast.error(
                    error.data.message || error.error || "Something went wrong",
                  ),
                );
              handleClose();
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  width={"100%"}
                  component={Paper}
                >
                  <FormLabel>Title</FormLabel>
                  <Field
                    as={TextField}
                    name="title"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "entity",
                        e.target.value.split(" ").join("_"),
                      );
                    }}
                    onBlur={handleBlur}
                    value={values.title}
                    error={Boolean(errors.title && touched.title)}
                    helperText={touched.title && errors.title}
                    fullWidth
                  />
                  <FormLabel>Description</FormLabel>
                  <Field
                    as={TextField}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={Boolean(errors.description && touched.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                  />
                  <FormLabel>Entity </FormLabel>
                  <Field
                    as={TextField}
                    name="entity"
                    onChange={handleChange}
                    disabled
                    onBlur={handleBlur}
                    value={values.entity}
                    error={Boolean(errors.entity && touched.entity)}
                    helperText={touched.entity && errors.entity}
                    fullWidth
                  />
                  <FormLabel>Version </FormLabel>
                  <Field
                    as={TextField}
                    name="version"
                    onChange={handleChange}
                    disabled
                    onBlur={handleBlur}
                    value={values.version}
                    error={Boolean(errors.version && touched.version)}
                    helperText={touched.version && errors.version}
                    fullWidth
                  />
                </Box>

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
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDataObjectDialog;
