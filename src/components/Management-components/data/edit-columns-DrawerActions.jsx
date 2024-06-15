import { useUpdateAdminObjectMutation } from "@/app/features/admin-apis/admin-object-api-slice";
import { LinkOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
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
import { FieldArray, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
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
    propertyName: yup.string().required("Property name is required"),
    description: yup.string().required("Description is required"),
    type: yup.string().required("Type is required"),
    ui_type: yup.string().required("UI Type is required").default("string"),
    required: yup.boolean(),
    display_ui: yup.boolean(),
    searchable: yup.boolean(),
    minLength: yup.number(),
    maxLength: yup.number(),
    pattern: yup.string(),
    options: yup.array().when("ui_type", {
      is: "select" || "checkbox" || "radio",
      then: (schema) =>
        schema
          .of(
            yup.object().shape({
              label: yup.string().required("Label is required"),
              value: yup.string().required("Value is required"),
            })
          )
          .required("Options are required"),
    }),
  });

  const [updateObject] = useUpdateAdminObjectMutation();

  return (
    <>
      <Tooltip title="Edit Columns">
        {/* <IconButton onClick={handleOpen}>
              <Link />
        </IconButton> */}
        <Button
          onClick={handleOpen}
          endIcon={<LinkOutlined />}
          sx={{ ":hover": { textDecoration: "underline" } }}
        >
          {propertyName}
        </Button>
      </Tooltip>

      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Formik
          initialValues={{
            propertyName,
            description,
            type,
            ui_type,
            required: required || false,
            display_ui: display_ui || false,
            searchable: searchable || false,
            minLength,
            maxLength,
            pattern,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const properties = dataObject.properties;

            const updatedObject = {
              ...dataObject,
              properties: {
                ...properties,
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
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                gap={2}
                width="400px"
                component={Paper}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">
                    Edit Columns
                    <span
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </span>
                  </Typography>
                </Box>
                <Box>
                  <FormLabel> Type </FormLabel>
                  <Select
                    name="type"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.type || "string"}
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
                    value={values.ui_type || "text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ui_type && touched.ui_type)}
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
                  <Checkbox
                    name="required"
                    variant="outlined"
                    size="small"
                    checked={values.required}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box>
                  <FormLabel>Display UI</FormLabel>
                  <Switch
                    name="display_ui"
                    variant="outlined"
                    size="small"
                    checked={values.display_ui}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box>
                  <FormLabel>Searchable</FormLabel>
                  <Switch
                    name="searchable"
                    variant="outlined"
                    size="small"
                    checked={values.searchable}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                {/*  options */}
                {["select", "checkbox", "radio"].includes(values.ui_type) && (
                  <FieldArray
                    name="options"
                    render={(arrayHelpers) => (
                      <Box>
                        <FormLabel>Options</FormLabel>

                        {values?.options?.length > 0 &&
                          values?.options.map((option, index) => (
                            <Box key={index} display="flex" gap={1} mb={1}>
                              <TextField
                                name={`options.${index}.label`}
                                variant="outlined"
                                size="small"
                                label="Label"
                                value={option.label || ""}
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
                                value={option.value || ""}
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

                {/*  options */}
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
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
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
