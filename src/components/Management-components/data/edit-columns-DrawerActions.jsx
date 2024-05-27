import { LinkOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Form, FieldArray, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import * as yup from "yup";
import { useUpdateAdminObjectMutation } from "@/app/features/admin-apis/admin-object-api-slice";
import toast from "react-hot-toast";

const EditColumnsDrawerActions = ({
  dataObject,
  label,
  propertyName,
  description,
  type,
  ui_type,
  required,
  display_ui,
  searchable,
  minLength,
  maxLength,
  pattern,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ui_typeOptions = [
    "text",
    "number",
    "checkbox",
    "select",
    "date",
    "time",
    "datetime",
    "file",
    "radio",
    "switch",
  ];

  const validationSchema = yup.object({
    type: yup.string().required("Type is required"),
    ui_type: yup.string().required("UI Type is required"),
    required: yup.boolean(),
    display_ui: yup.boolean(),
    searchable: yup.boolean(),
    minLength: yup.number(),
    maxLength: yup.number(),
    pattern: yup.string(),
    options: yup.array().when("ui_type", {
      is: (value) =>
        value === "select" || value === "checkbox" || value === "radio",
      then: yup
        .array()
        .of(
          yup.object().shape({
            label: yup.string().required("Label is required"),
            value: yup.string().required("Value is required"),
          })
        )
        .min(1, "At least one option is required"),
      otherwise: yup.array().of(
        yup.object().shape({
          label: yup.string().notRequired(),
          value: yup.string().notRequired(),
        })
      ),
    }),
  });

  const [updateObject] = useUpdateAdminObjectMutation();

  return (
    <>
      <Tooltip title="Edit Columns">
        <Button
          onClick={handleOpen}
          endIcon={<LinkOutlined />}
          sx={{ ":hover": { textDecoration: "underline" } }}
        >
          {propertyName}
        </Button>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        variant="temporary"
        PaperProps={{
          sx: {
            width: {
              xs: "90%",
              sm: 450,
              md: 450,
              lg: 450,
              xl: 450,
            },
            zIndex: 2000, // Ensure that the zIndex is set properly
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{ zIndex: 1302 }}
        disableScrollLock
        PaperComponent={({ children }) => children}
        transitionDuration={0}
      >
        <Formik
          initialValues={{
            type,
            ui_type,
            required,
            display_ui,
            searchable,
            minLength,
            maxLength,
            pattern,
            options: options || [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const updatedObject = {
              ...dataObject,
              properties: {
                ...dataObject.properties,
                [propertyName]: {
                  label,
                  description,
                  ...values,
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
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflow: "auto",
              }}
            >
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                gap={2}
                width="400px"
                component={Paper}
              >
                <Typography variant="h6">
                  Edit{" "}
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </span>
                </Typography>
                <Box>
                  <FormLabel> Type</FormLabel>
                  <Select
                    name="type"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.type && touched.type)}
                  >
                    {["string", "number", "boolean", "array"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <FormLabel>Ui Type </FormLabel>
                  <Select
                    name="ui_type"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.ui_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ui_type && touched.ui_type)}
                    sx={{
                      zIndex: 4,
                    }}
                  >
                    {ui_typeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <FormLabel>Required</FormLabel>
                  <Switch
                    name="required"
                    variant="outlined"
                    size="small"
                    fullWidth
                    checked={values.required}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Display UI</FormLabel>
                  <Switch
                    name="display_ui"
                    variant="outlined"
                    size="small"
                    fullWidth
                    checked={values.display_ui}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Searchable</FormLabel>
                  <Switch
                    name="searchable"
                    variant="outlined"
                    size="small"
                    fullWidth
                    checked={values.searchable}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Min Length</FormLabel>
                  <TextField
                    name="minLength"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.minLength}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.minLength && touched.minLength)}
                    helperText={touched.minLength && errors.minLength}
                  />
                </Box>
                <Box>
                  <FormLabel>Max Length</FormLabel>
                  <TextField
                    name="maxLength"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.maxLength}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.maxLength && touched.maxLength)}
                    helperText={touched.maxLength && errors.maxLength}
                  />
                </Box>
                <Box>
                  <FormLabel>Pattern</FormLabel>
                  <TextField
                    name="pattern"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.pattern}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.pattern && touched.pattern)}
                    helperText={touched.pattern && errors.pattern}
                  />
                </Box>

                {["select", "checkbox", "radio"].includes(values.ui_type) && (
                  <FieldArray
                    name="options"
                    render={(arrayHelpers) => (
                      <Box>
                        <FormLabel>Options</FormLabel>
                        {values.options.map((option, index) => (
                          <Box key={index} display="flex" gap={1} mb={1}>
                            <TextField
                              name={`options.${index}.label`}
                              variant="outlined"
                              size="small"
                              label="Label"
                              value={option.label}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                errors.options?.[index]?.label &&
                                  touched.options?.[index]?.label
                              )}
                              helperText={
                                touched.options?.[index]?.label &&
                                errors.options?.[index]?.label
                              }
                            />
                            <TextField
                              name={`options.${index}.value`}
                              variant="outlined"
                              size="small"
                              label="Value"
                              value={option.value}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                errors.options?.[index]?.value &&
                                  touched.options?.[index]?.value
                              )}
                              helperText={
                                touched.options?.[index]?.value &&
                                errors.options?.[index]?.value
                              }
                            />
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                        <Button
                          variant="contained"
                          onClick={() =>
                            arrayHelpers.push({ label: "", value: "" })
                          }
                        >
                          Add Option
                        </Button>
                      </Box>
                    )}
                  />
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "revert",
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

EditColumnsDrawerActions.propTypes = {
  dataObject: PropTypes.object.isRequired,
  label: PropTypes.string,
  propertyName: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  display_ui: PropTypes.bool,
  searchable: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
  ui_type: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

export default EditColumnsDrawerActions;
