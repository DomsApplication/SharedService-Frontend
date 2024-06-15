import { useGetAdminObjectQuery } from "@/app/features/admin-apis/admin-object-api-slice";
import {
  useCreateAdminRepoMutation,
  useGetOneAdminRepoQuery,
  useUpdateAdminRepoMutation,
} from "@/app/features/admin-apis/admin-repo-api-slice";
import HeadingNav from "@/components/heading-nav";
import {
  Box,
  Button,
  Card,
  FormLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  Radio,
  Switch,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { DatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";

const DataRepoEditAndCreate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const objectId = params.objectId;
  const id = params.id;
  const navigateToUserList = () => {
    navigate(`/data-management/${objectId}/repo`);
  };

  const isEdit = id !== "new";
  const title = isEdit ? "Edit Record" : "Create Record";
  const successMessage = isEdit
    ? `Update ${title} SuccessFul`
    : `Add ${title} SuccessFul`;
  const errorMessage = isEdit
    ? `Failed to Update ${title}`
    : `Failed to Add ${title}`;
  const buttonText = isEdit ? `Update ${title}` : `Add ${title}`;

  const { data, isLoading, isError, error } = useGetAdminObjectQuery(objectId);

  const {
    data: editData,
    isLoading: isEditLoading,
    isError: isEditError,
    error: editError,
  } = useGetOneAdminRepoQuery({ id: objectId, subId: id }, { skip: !isEdit });

  const [createUser] = useCreateAdminRepoMutation();
  const [updateUser] = useUpdateAdminRepoMutation();

  if (isLoading || (isEdit && isEditLoading)) return <div>Loading...</div>;
  if (isError || (isEdit && isEditError)) {
    toast.error(
      error?.data?.message || editError?.data?.message || "Something went wrong"
    );
    return null;
  }

  if (data || (isEdit && editData)) {
    const initialValues = {};
    const validationSchemaFields = {};

    Object.entries(data.properties).forEach(([key, value]) => {
      if (value.display_ui) {
        initialValues[key] = isEdit ? editData[key] : "";

        let schema = Yup.string();
        if (value.ui_type === "number") {
          schema = Yup.number();
        } else if (value.ui_type === "checkbox") {
          schema = Yup.boolean();
          initialValues[key] = isEdit ? !!editData[key] : false;
        } else if (
          value.ui_type === "date" ||
          value.ui_type === "time" ||
          value.ui_type === "datetime"
        ) {
          schema = Yup.date();
        } else if (value.ui_type === "file") {
          schema = Yup.string();
        }

        if (value.required) {
          schema = schema.required("This field is required");
        }
        if (value.minLength) {
          schema = schema.min(
            value.minLength,
            `Please enter at least ${value.minLength} characters`
          );
        }
        if (value.maxLength) {
          schema = schema.max(
            value.maxLength,
            `Please enter no more than ${value.maxLength} characters`
          );
        }
        if (value.pattern) {
          schema = schema.matches(
            new RegExp(value.pattern),
            `Please enter a valid ${key}`
          );
        }
        if (value.options) {
          schema = schema.oneOf(value.options, "Please select a valid option");
        }

        validationSchemaFields[key] = schema;
      }
    });

    const validationSchema = Yup.object().shape(validationSchemaFields);

    const handleSubmit = async (values, actions) => {
      try {
        if (isEdit) {
          await updateUser({ entity: objectId, ...values }).unwrap();
        } else {
          await createUser({ entity: objectId, ...values }).unwrap();
        }
        toast.success(successMessage);
        navigateToUserList();
      } catch (error) {
        toast.error(error?.data?.message || errorMessage);
      } finally {
        actions.setSubmitting(false);
      }
    };

    return (
      <Box sx={{ width: "100%" }}>
        <HeadingNav
          navLinks={[
            { link: "/dash", label: "Dashboard" },
            { link: "/data-management", label: "Data Management" },
            { link: `/data-management/${objectId}/repo`, label: objectId },
            { link: `/data-management/${objectId}/repo/${id}`, label: title },
          ]}
        />
        <Box>
          <Typography variant="h4">{title}</Typography>

          <Box sx={{ width: "100%" }} component={Paper}>
            {/* Form component here */}
          </Box>
        </Box>

        <Paper sx={{ margin: "20px", padding: "20px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form>
                <Box>
                  <Typography variant="h5">Record Details</Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1fr 1fr",
                    },
                  }}
                >
                  {Object.entries(data.properties).map(([key, value]) => {
                    if (!value.display_ui) return null;

                    const renderInputField = () => {
                      switch (value.ui_type) {
                        case "text":
                        case "number":
                          return (
                            <Field
                              name={key}
                              as={TextField}
                              type={
                                value.ui_type === "number" ? "number" : "text"
                              }
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              value={values[key]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={touched[key] && errors[key]}
                              error={touched[key] && Boolean(errors[key])}
                              disabled={isSubmitting}
                            />
                          );

                        case "checkbox":
                          return (
                            <FormControl>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={key}
                                    checked={values[key]}
                                    onChange={(e) =>
                                      setFieldValue(key, e.target.checked)
                                    }
                                  />
                                }
                                label={key}
                              />
                              <FormHelperText
                                error={Boolean(touched[key] && errors[key])}
                              >
                                {touched[key] && errors[key]}
                              </FormHelperText>
                            </FormControl>
                          );

                        case "select":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <Select
                                name={key}
                                value={values[key]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched[key] && errors[key])}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  Select {key}
                                </MenuItem>
                                {value.options.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText
                                error={Boolean(touched[key] && errors[key])}
                              >
                                {touched[key] && errors[key]}
                              </FormHelperText>
                            </FormControl>
                          );

                        case "date":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <DatePicker
                                label={key}
                                value={values[key] || null}
                                onChange={(val) => setFieldValue(key, val)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(touched[key] && errors[key])}
                                    helperText={touched[key] && errors[key]}
                                  />
                                )}
                              />
                            </FormControl>
                          );

                        case "time":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <TimePicker
                                label={key}
                                value={values[key] || null}
                                onChange={(val) => setFieldValue(key, val)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(touched[key] && errors[key])}
                                    helperText={touched[key] && errors[key]}
                                  />
                                )}
                              />
                            </FormControl>
                          );

                        case "datetime":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <DateTimePicker
                                label={key}
                                value={values[key] || null}
                                onChange={(val) => setFieldValue(key, val)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(touched[key] && errors[key])}
                                    helperText={touched[key] && errors[key]}
                                  />
                                )}
                              />
                            </FormControl>
                          );

                        case "file":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <TextField
                                name={key}
                                type="file"
                                onChange={(event) => {
                                  const file = event.currentTarget.files[0];
                                  setFieldValue(key, file ? file.name : "");
                                }}
                                helperText={touched[key] && errors[key]}
                                error={Boolean(touched[key] && errors[key])}
                              />
                            </FormControl>
                          );

                        case "textarea":
                          return (
                            <TextField
                              name={key}
                              type="text"
                              value={values[key]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              multiline
                              rows={4}
                              disabled
                            />
                          );

                        case "url":
                          return (
                            <TextField
                              name={key}
                              type="url"
                              value={values[key]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              disabled
                            />
                          );

                        case "email":
                          return (
                            <TextField
                              name={key}
                              type="email"
                              value={values[key]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              disabled
                            />
                          );

                        case "password":
                          return (
                            <TextField
                              name={key}
                              type="password"
                              value={values[key]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              disabled
                            />
                          );

                        case "radio":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <RadioGroup
                                name={key}
                                value={values[key]}
                                onChange={handleChange}
                              >
                                {value.options.map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          );

                        case "switch":
                          return (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <FormControlLabel
                                control={
                                  <Switch
                                    name={key}
                                    checked={values[key]}
                                    onChange={handleChange}
                                  />
                                }
                                label={key}
                              />
                            </FormControl>
                          );

                        default:
                          return (
                            <Field
                              name={key}
                              as={TextField}
                              type={
                                value.ui_type === "number" ? "number" : "text"
                              }
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              value={values[key]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={touched[key] && errors[key]}
                              error={touched[key] && Boolean(errors[key])}
                              disabled={isSubmitting}
                            />
                          );
                      }
                    };

                    return (
                      <Card key={key} sx={{ p: 2 }}>
                        <FormLabel
                          sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                          {key}
                        </FormLabel>
                        {renderInputField()}
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
                        </Typography>
                      </Card>
                    );
                  })}
                </Box>
                <Box display="flex" justifyContent="end" gap={2} mt={2}>
                  <Button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    onClick={navigateToUserList}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {buttonText}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    );
  }
};

export default DataRepoEditAndCreate;

// const ui_typeOptions = [
//   "text",
//   "number",
//   "checkbox",
//   "select",
//   "date",
//   "time",
//   "datetime",
//   "radio",
//   "switch",
// ];
//  there are options for select, radio, and checkbox
//  there are no  options for text, number, date, time, and datetime
//  use date from mui for date, time from mui for time, and datetime from mui for datetime
//  use components from mui and make it complete this form
//  use value.options for select ,radio , checkbox
