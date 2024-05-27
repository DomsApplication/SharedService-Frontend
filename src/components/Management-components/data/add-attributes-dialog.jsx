import { useUpdateAdminObjectMutation } from "@/app/features/admin-apis/admin-object-api-slice";
import { AddOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  FormLabel,
  Paper,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import propTypes from "prop-types";
import React from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

const AddAttributesDialog = ({ dataObject }) => {
  const [open, setOpen] = React.useState(false);
  const [updateObject] = useUpdateAdminObjectMutation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    propertyLabel: yup
      .string()
      .matches(
        /^[a-zA-Z_ ]*$/,
        "Label can only contain letters, underscores, and spaces"
      )
      .required("Required"),
    propertyId: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });

  const initialData = {
    propertyLabel: "",
    propertyId: "",
    description: "",
  };

  return (
    <div>
      <Button
        startIcon={<AddOutlined />}
        variant="contained"
        onClick={handleOpen}
      >
        Add Attribute
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> Add Attribute To Data Object </DialogTitle>
        <DialogContent
          sx={{
            p: 2,
          }}
        >
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              const { propertyLabel, propertyId, description } = values;

              const updatedObject = {
                ...dataObject,
                properties: {
                  ...dataObject.properties,
                  [propertyId]: {
                    label: propertyLabel,
                    description,
                  },
                },
              };

              try {
                const response = await updateObject(updatedObject).unwrap();
                toast.success(response.message);
                handleClose();
              } catch (error) {
                toast.error(
                  error.data?.message || error.error || "Something went wrong"
                );
              } finally {
                setSubmitting(false);
              }
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
                  {/* propertyLabel and propertyId */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 3,
                      alignItems: "center",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "row",
                        xl: "row",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "50%",
                        },
                      }}
                    >
                      <FormLabel
                        sx={{
                          color: "text.primary",
                        }}
                      >
                        Property Label
                      </FormLabel>
                      <Field
                        as={TextField}
                        name="propertyLabel"
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "propertyId",
                            e.target.value.toLowerCase().split(" ").join("_")
                          );
                        }}
                        onBlur={handleBlur}
                        value={values.propertyLabel}
                        error={Boolean(
                          errors.propertyLabel && touched.propertyLabel
                        )}
                        helperText={
                          touched.propertyLabel && errors.propertyLabel
                        }
                        fullWidth
                      />
                    </Box>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "50%",
                        },
                      }}
                    >
                      <FormLabel>Property ID</FormLabel>
                      <Field
                        as={TextField}
                        name="propertyId"
                        onChange={handleChange}
                        disabled
                        onBlur={handleBlur}
                        value={values.propertyId}
                        error={Boolean(errors.propertyId && touched.propertyId)}
                        helperText={touched.propertyId && errors.propertyId}
                        fullWidth
                      />
                    </Box>
                  </Box>

                  {/* Description */}
                  <FormLabel
                    sx={{
                      color: "text.primary",
                    }}
                  >
                    Description
                  </FormLabel>
                  <Field
                    as={TextareaAutosize}
                    minRows={5}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <Box>
                    {touched.description && errors.description && (
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    )}
                  </Box>
                </Box>

                <DialogActions
                  sx={{
                    p: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
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

AddAttributesDialog.propTypes = {
  dataObject: propTypes.object.isRequired,
};

export default AddAttributesDialog;
