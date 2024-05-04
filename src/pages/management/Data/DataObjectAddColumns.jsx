// Import all necessary modules and icons
import {
  useGetAdminObjectQuery,
  useUpdateAdminObjectMutation,
} from "@/app/features/admin-apis/admin-object-api-slice";
import HeadingNav from "@/components/heading-nav";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as yup from "yup";

// Define the validation schema
const validationSchema = yup.object({
  properties: yup.array().of(
    yup.object({
      propertyName: yup.string().required(" property name  Required"),
      description: yup.string().required("description Required"),
      type: yup.string().required("Required"),
      required: yup.boolean(),
      display_ui: yup.boolean(),
      unique: yup.boolean(),
      searchable: yup.boolean(),
      minLength: yup.number(),
      maxLength: yup.number(),
      pattern: yup.string(),
    }),
  ),
});

// Define the columns for DataGrid
const columns = [
  { field: "propertyName", headerName: "Property Name", width: 200 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "description", headerName: "Description", width: 200 },
  // ... (define additional columns as needed)
  // Icons columns
  {
    field: "required",
    headerName: "Required",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <CheckCircleOutlineIcon color="success" />
      ) : (
        <HighlightOffIcon color="error" />
      ),
  },
  {
    field: "display_ui",
    headerName: "Display UI",
    width: 150,
    renderCell: (params) =>
      params.value ? (
        <CheckCircleOutlineIcon color="success" />
      ) : (
        <HighlightOffIcon color="error" />
      ),
  },
  {
    field: "unique",
    headerName: "Unique",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <CheckCircleOutlineIcon color="success" />
      ) : (
        <HighlightOffIcon color="error" />
      ),
  },
  {
    field: "searchable",
    headerName: "Searchable",
    width: 150,
    renderCell: (params) =>
      params.value ? (
        <CheckCircleOutlineIcon color="success" />
      ) : (
        <HighlightOffIcon color="error" />
      ),
  },
  {
    field: "minLength",
    headerName: "Min Length",
    width: 150,
  },
  {
    field: "maxLength",
    headerName: "Max Length",
    width: 150,
  },
  {
    field: "pattern",
    headerName: "Pattern",
    width: 150,
  },
  // ... (define additional columns as needed)
];

// Define the select options for the 'type' field
const typeOptions = [
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

// The main component
const DataObjectAddColumns = () => {
  const objectId = useParams().objectId;
  const { data, isLoading, isError, isSuccess, error } =
    useGetAdminObjectQuery(objectId);
  const [updateAdminObject] = useUpdateAdminObjectMutation();
  // The function for handling form submission will likely involve an API call
  const handleFormSubmission = async (values, { setSubmitting }) => {
    console.log(values);
    // chage values to key value pair
    // key is property name and value is the properties
    const properties = {};
    values.properties.forEach((property) => {
      properties[property.propertyName] = property;
    });
    console.log(properties);

    const obj = { ...data };
    obj.properties = properties;
    await updateAdminObject({ obj, id: objectId })
      .unwrap()
      .then(() => toast.success("Object properties Updated Successfully"))
      .catch((error) => toast.error(error.data.message || error.data.error));
    setSubmitting(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error(
      error.data.message || error.data.error || "Something went wrong",
    );
    return <div>Error</div>;
  }
  if (isSuccess) {
    const initialValues = {
      properties: Object.entries(data?.properties || {}).map(
        ([key, value]) => ({
          propertyName: key,
          ...value,
        }),
      ),
    };

    return (
      <Box>
        <HeadingNav
          navLinks={[
            { link: "/", label: "Dashboard" },
            { link: "/data-management", label: "Data Management" },
            { link: `/data-management/${objectId}`, label: objectId },
          ]}
        />

        <Box
          component={Paper}
          sx={{ p: 1, gap: 3, display: "flex", flexDirection: "column" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmission}
          >
            {(formikProps) => (
              <Form>
                {/* Other form fields go here, each wrapped within <Grid> items for layout */}
                {/* ... */}
                <FieldArray name="properties">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values, errors, touched } = form;
                    const { properties } = values;

                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        {properties.length > 0 &&
                          properties.map((property, index) => (
                            <Card
                              key={index}
                              sx={{
                                p: 2,
                              }}
                            >
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={6} md={4}>
                                  <Field
                                    name={`properties[${index}].propertyName`}
                                    as={TextField}
                                    label="Property Name"
                                    fullWidth
                                    error={Boolean(
                                      getIn(
                                        touched,
                                        `properties[${index}].propertyName`,
                                      ) &&
                                        getIn(
                                          errors,
                                          `properties[${index}].propertyName`,
                                        ),
                                    )}
                                    helperText={
                                      getIn(
                                        touched,
                                        `properties[${index}].propertyName`,
                                      ) &&
                                      getIn(
                                        errors,
                                        `properties[${index}].propertyName`,
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  {/* description */}
                                  <Field
                                    name={`properties.${index}.description`}
                                    placeholder="Description ..."
                                    label="Description"
                                    fullWidth
                                    as={TextField}
                                    error={Boolean(
                                      getIn(
                                        errors,

                                        `properties.${index}.description`,
                                      ) &&
                                        getIn(
                                          touched,
                                          `properties.${index}.description`,
                                        ),
                                    )}
                                    helperText={
                                      getIn(
                                        errors,

                                        `properties.${index}.description`,
                                      ) &&
                                      getIn(
                                        touched,
                                        `properties.${index}.description`,
                                      )
                                    }
                                  />
                                </Grid>

                                {/* Example for 'type' Select field*/}
                                <Grid item xs={12} sm={6} md={4}>
                                  <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                      name={`properties[${index}].type`}
                                      value={property.type}
                                      onChange={formikProps.handleChange}
                                      error={Boolean(
                                        getIn(
                                          touched,
                                          `properties[${index}].type`,
                                        ) &&
                                          getIn(
                                            errors,
                                            `properties[${index}].type`,
                                          ),
                                      )}
                                    >
                                      {typeOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    <Typography
                                      variant="inherit"
                                      color="textSecondary"
                                    >
                                      {getIn(
                                        touched,
                                        `properties[${index}].type`,
                                      ) &&
                                        getIn(
                                          errors,
                                          `properties[${index}].type`,
                                        )}
                                    </Typography>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  {/* pattern */}
                                  <Field
                                    name={`properties.${index}.pattern`}
                                    placeholder="Pattern ..."
                                    label="Pattern"
                                    fullWidth
                                    as={TextField}
                                    error={Boolean(
                                      getIn(
                                        errors,

                                        `properties.${index}.pattern`,
                                      ) &&
                                        getIn(
                                          touched,
                                          `properties.${index}.pattern`,
                                        ),
                                    )}
                                    helperText={
                                      getIn(
                                        errors,

                                        `properties.${index}.pattern`,
                                      ) &&
                                      getIn(
                                        touched,
                                        `properties.${index}.pattern`,
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  {/* required */}
                                  <FormControlLabel
                                    control={
                                      <Field
                                        name={`properties.${index}.required`}
                                        type="checkbox"
                                        as={Switch}
                                      />
                                    }
                                    label="Required"
                                  />
                                </Grid>

                                {/* Display UI */}
                                <Grid item xs={12} sm={6} md={4}>
                                  <FormControlLabel
                                    control={
                                      <Field
                                        name={`properties.${index}.display_ui`}
                                        type="checkbox"
                                        as={Switch}
                                      />
                                    }
                                    label="Display UI"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  <FormControlLabel
                                    control={
                                      <Field
                                        name={`properties.${index}.unique`}
                                        type="checkbox"
                                        as={Switch}
                                      />
                                    }
                                    label="Unique"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  <FormControlLabel
                                    control={
                                      <Field
                                        name={`properties.${index}.searchable`}
                                        type="checkbox"
                                        as={Switch}
                                      />
                                    }
                                    label="Searchable"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                  {/*  minLength */}
                                  <Field
                                    name={`properties.${index}.minLength`}
                                    placeholder="Min Length ..."
                                    label="Min Length"
                                    fullWidth
                                    as={TextField}
                                    error={Boolean(
                                      getIn(
                                        errors,

                                        `properties.${index}.minLength`,
                                      ) &&
                                        getIn(
                                          touched,
                                          `properties.${index}.minLength`,
                                        ),
                                    )}
                                    helperText={
                                      getIn(
                                        errors,

                                        `properties.${index}.minLength`,
                                      ) &&
                                      getIn(
                                        touched,
                                        `properties.${index}.minLength`,
                                      )
                                    }
                                  />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                  {/* maxLength */}
                                  <Field
                                    name={`properties.${index}.maxLength`}
                                    placeholder="Max Length ..."
                                    label="Max Length"
                                    fullWidth
                                    as={TextField}
                                    error={Boolean(
                                      getIn(
                                        errors,

                                        `properties.${index}.maxLength`,
                                      ) &&
                                        getIn(
                                          touched,
                                          `properties.${index}.maxLength`,
                                        ),
                                    )}
                                    helperText={
                                      getIn(
                                        errors,

                                        `properties.${index}.maxLength`,
                                      ) &&
                                      getIn(
                                        touched,
                                        `properties.${index}.maxLength`,
                                      )
                                    }
                                  />
                                </Grid>

                                {/* Continue with other form fields */}

                                {/* Remove Button */}
                                <Grid item xs={12} sm={6} md={4}>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Grid>
                              </Grid>
                            </Card>
                          ))}

                        {/* Add Button */}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({
                              propertyName: "",
                              type: "string",
                              required: false,
                              display_ui: true,
                              // Assign default values for the rest of your properties here
                            })
                          }
                        >
                          Add Property
                        </Button>
                      </Box>
                    );
                  }}
                </FieldArray>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    my: 2,
                  }}
                >
                  Submit Properties
                </Button>
              </Form>
            )}
          </Formik>

          {/* DataGrid to display values */}
          <Box sx={{ height: 400, width: "100%", my: 2 }}>
            <DataGrid
              rows={Object.entries(data?.properties || []).map(
                ([key, value]) => ({
                  id: key,
                  propertyName: key,
                  ...value,
                }),
              )}
              initialState={{
                pageSize: 5,
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              disableSelectionOnClick
              disableColumnFilter
              disableColumnMenu
              disableDensitySelector
              autoHeight
              sx={{ my: 2 }}
            />
          </Box>
        </Box>
      </Box>
    );
  }
};

export default DataObjectAddColumns;
