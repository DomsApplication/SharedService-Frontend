import {
  useGetAdminObjectQuery,
  useUpdateAdminObjectMutation,
} from "@/app/features/admin-apis/admin-object-api-slice";
import { CheckBox, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

const EditDataObjectDialog = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [createAdminObject] = useUpdateAdminObjectMutation();
  const { data, isError, isLoading, error } = useGetAdminObjectQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.data.message || error.data.error}</div>;
  }

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
        "Title must be alphanumeric, can include underscores and spaces"
      )
      .min(3, "Title must be at least 3 characters")
      .max(64, "Title must be at most 64 characters")
      .required("Title is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(400, "Description must be at most 400 characters"),
    entity: yup.string().required("Entity is required"),
    version: yup.number().required("Version is required"),
    shortName: yup.string().required("Short Name is required").min(3).max(4),
    unique_name: yup.string().required("Unique Name is required"),
    unique_label: yup.string().required("Unique Label is required"),
    auto_generate_id: yup.boolean().required("Auto Generate ID is required"),

    // Define conditional fields using yup.lazy
    conditionalFields: yup.lazy((value, { parent }) => {
      if (parent.auto_generate_id) {
        // If auto_generate_id is true, these fields are required
        return yup.object({
          prefix: yup.string().required("Prefix is required"),
          delimiter: yup.string().required("Delimiter is required"),
          start_from: yup.number().required("Start From is required"),
          length: yup.number().required("Length is required"),
        });
      }
      // If auto_generate_id is false, no additional constraints
      return yup.object().shape({});
    }),
  });

  // ... rest of your component

  const initialData = {
    title: data?.title,
    description: data?.description,
    entity: Object.keys(data?.properties)[1],
    version: data?.version,
    shortName: data?.properties[Object.keys(data?.properties)[0]].short_name,
    auto_generate_id:
      data?.properties[Object.keys(data?.properties)[1]].auto_generate_id,
    prefix: data?.properties[Object.keys(data?.properties)[1]].prefix,
    delimiter: data?.properties[Object.keys(data?.properties)[1]].delimiter,
    start_from: data?.properties[Object.keys(data?.properties)[1]].start_from,
    length: data?.properties[Object.keys(data?.properties)[1]].length,
    unique_label:
      data?.properties[Object.keys(data?.properties)[0]]?.unique_label,
    unique_name: data?.properties[Object.keys(data?.properties)[0]]?.uniquekey,
  };
  console.log(initialData);
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
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              //               console.log(values);
              const {
                title,
                description,
                entity,
                version,
                shortName,
                auto_generate_id,
                prefix,
                delimiter,
                start_from,
                length,
                unique_name,
                unique_label,
              } = values;
              //        "entity": {
              //     "description": "The object entity name",
              //     "enum": [
              //         "user"
              //     ],
              //     "short_name": "user",
              //     "uniquekey": "user_id",
              //     "display_ui": false
              // },
              // "user_id": {
              //     "description": "The unique identifier of the user object",
              //     "type": "string",
              //     "pattern": "[a-zA-Z0-9_-]*$",
              //     "minLength": 5,
              //     "maxLength": 20,
              //     "searchable": true,
              //     "display_ui": true
              // },
              const object = {
                title,
                description,
                entity,
                version,
                type: "object",
                properties: {
                  entity: {
                    description: "The object entity name",
                    enum: [entity],
                    short_name: shortName,
                    uniquekey: `${unique_label}`,
                    unique_name,
                    display_ui: false,
                  },
                  [`${unique_label}`]: {
                    description: "The unique identifier of the object",
                    type: "string",
                    pattern: "[a-zA-Z0-9_-]*$",
                    minLength: 5,
                    maxLength: 20,
                    searchable: true,
                    display_ui: true,
                    auto_generate_id,
                  },
                },
              };
              if (auto_generate_id) {
                object.properties[`${unique_label}`] = {
                  description: "The unique identifier of the object",
                  type: "string",
                  pattern: "[a-zA-Z0-9_-]*$",
                  minLength: 5,
                  maxLength: 20,
                  searchable: true,
                  display_ui: true,
                  auto_generate_id: true,

                  prefix: values.prefix,
                  delimiter: values.delimiter,
                  start_from: values.start_from,
                  length: values.length,
                };
              }
              await createAdminObject(object)
                .unwrap()
                .then((data) => toast.success(data.message))
                .catch((error) =>
                  toast.error(
                    error.data.message || error.error || "Something went wrong"
                  )
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
            }) => (
              <Form>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  width={"100%"}
                  component={Paper}
                >
                  {/*  title and entity */}
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
                        Title
                      </FormLabel>
                      <Field
                        as={TextField}
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        error={Boolean(errors.title && touched.title)}
                        helperText={touched.title && errors.title}
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
                    </Box>
                  </Box>
                  {/*  short name and version  */}
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
                        Short Name{" "}
                      </FormLabel>
                      <Field
                        as={TextField}
                        name="shortName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.shortName}
                        error={Boolean(errors.shortName && touched.shortName)}
                        helperText={touched.shortName && errors.shortName}
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
                  </Box>
                  {/*  unique name and unique label */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 3,
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
                        Unique Name
                      </FormLabel>
                      <Field
                        as={TextField}
                        name="unique_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unique_name}
                        error={Boolean(
                          errors.unique_name && touched.unique_name
                        )}
                        helperText={touched.unique_name && errors.unique_name}
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
                      <FormLabel>Unique Label</FormLabel>
                      <Field
                        as={TextField}
                        name="unique_label"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unique_label}
                        disabled
                        error={Boolean(
                          errors.unique_label && touched.unique_label
                        )}
                        helperText={touched.unique_label && errors.unique_label}
                        fullWidth
                      />
                    </Box>
                  </Box>

                  {/*  auto generate id (using Switch ) and other properties */}
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
                    <FormLabel
                      sx={{
                        color: "text.primary",
                      }}
                    >
                      Auto Generate ID
                    </FormLabel>
                    <Field
                      as={CheckBox}
                      name="auto_generate_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.auto_generate_id}
                    />
                    <Box>
                      {touched.auto_generate_id && errors.auto_generate_id && (
                        <FormHelperText error>
                          {errors.auto_generate_id}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>

                  {/* other properties are shown only if auto generate id is true */}
                  {/*  other properties -> prefix , delimiter , start from  and length */}
                  {values.auto_generate_id && (
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
                          Prefix
                        </FormLabel>
                        <Field
                          as={TextField}
                          name="prefix"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.prefix}
                          error={Boolean(errors.prefix && touched.prefix)}
                          helperText={touched.prefix && errors.prefix}
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
                        <FormLabel>Delimiter</FormLabel>
                        <Field
                          as={Select}
                          name="delimiter"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.delimiter}
                          error={Boolean(errors.delimiter && touched.delimiter)}
                          helperText={touched.delimiter && errors.delimiter}
                          fullWidth
                        >
                          {["-", "_"].map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>

                      <Box
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "50%",
                          },
                        }}
                      >
                        <FormLabel>Start From</FormLabel>
                        <Field
                          as={TextField}
                          name="start_from"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.start_from}
                          error={Boolean(
                            errors.start_from && touched.start_from
                          )}
                          helperText={touched.start_from && errors.start_from}
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
                        <FormLabel>Length</FormLabel>
                        <Field
                          as={TextField}
                          name="length"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.length}
                          error={Boolean(errors.length && touched.length)}
                          helperText={touched.length && errors.length}
                          fullWidth
                        />
                      </Box>
                    </Box>
                  )}

                  {/* description */}
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
EditDataObjectDialog.propTypes = {
  id: PropTypes.string.isRequired,
};
export default EditDataObjectDialog;
