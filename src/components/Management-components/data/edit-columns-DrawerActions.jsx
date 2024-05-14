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
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import * as yup from "yup";
const EditColumnsDrawerActions = ({
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
    "string",
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
  });

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
            required,
            display_ui,
            searchable,
            minLength,
            maxLength,
            pattern,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            handleClose();
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
                <Box>
                  <FormLabel>Property Name</FormLabel>
                  <TextField
                    name="propertyName"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.propertyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.propertyName && touched.propertyName)}
                    helperText={touched.propertyName && errors.propertyName}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>Description</FormLabel>
                  <TextareaAutosize
                    minRows={4}
                    name="description"
                    variant="outlined"
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.description && touched.description)}
                    helperText={touched.description && errors.description}
                  />
                </Box>
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
                    {ui_typeOptions.map((option) => (
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
                <Box>
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
};

export default EditColumnsDrawerActions;
