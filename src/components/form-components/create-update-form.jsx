import { useCreateFormMutation } from "@/app/features/dataApiSlice";
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { FieldArray, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DynamicForms from "@/components/form-components/DynamicForms";
import { useState } from "react";
const FormComponent = () => {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();
  const [isPreview, setIsPreview] = useState(false);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" p={4} sx={{ display: "flex", gap: 4 }}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={() => {
          setIsPreview(!isPreview);
        }}
      >
        {isPreview ? "Continue Editing The Form " : "See the Preview "}
      </Button>
      {isLoading ? (
        // Display skeleton while loading
        [...Array(8)].map((_, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton variant="rounded" width={"100%"} height={40} />
          </Grid>
        ))
      ) : (
        <Formik
          initialValues={{
            heading: "",
            description: "",
            items: [{ label: "", type: "", name: "", options: [] }],
          }}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            // Custom validation logic
            const allFieldsFilled =
              values.heading &&
              values.description &&
              values.items.every(
                (item) =>
                  item.label &&
                  item.type &&
                  item.name &&
                  (item.options.length || !["radio", "select", "checkbox"].includes(item.type))
              );

            if (!allFieldsFilled) {
              toast.error("Please fill in all fields");
              setSubmitting(false);
              return;
            }

            try {
              await createForm(values).unwrap();
              toast.success("Form created successfully");
              navigate("/");
            } catch (err) {
              toast.error(err?.data?.message || "Form creation failed");
              setErrors({ submit: err?.data?.message || "Form creation failed" });
              setStatus({ success: false });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleChange, touched, values }) => (
            <>
              {isPreview ? (
                <DynamicForms formConfig={values} />
              ) : (
                <Form>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                      Form Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2}>
                      <InputLabel htmlFor="heading">Heading</InputLabel>
                      <OutlinedInput
                        id="heading"
                        fullWidth
                        name="heading"
                        value={values.heading}
                        onChange={handleChange}
                        error={Boolean(errors.heading && touched.heading)}
                      />
                      {touched.heading && errors.heading && <FormHelperText error>{errors.heading}</FormHelperText>}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2}>
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <OutlinedInput
                        id="description"
                        fullWidth
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        error={Boolean(errors.description && touched.description)}
                      />
                      {touched.description && errors.description && (
                        <FormHelperText error>{errors.description}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                      Form Items
                    </Typography>
                  </Grid>
                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <>
                        {values.items.map((item, index) => (
                          <Grid container spacing={4} key={index}>
                            <Grid item xs={12}>
                              <Stack spacing={4}>
                                <InputLabel htmlFor={`label-${index}`}>Label</InputLabel>
                                <OutlinedInput
                                  id={`label-${index}`}
                                  fullWidth
                                  name={`items.${index}.label`}
                                  value={item.label}
                                  onChange={handleChange}
                                  error={Boolean(
                                    errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].label &&
                                      touched.items &&
                                      touched.items[index] &&
                                      touched.items[index].label
                                  )}
                                />
                                {touched.items &&
                                  touched.items[index] &&
                                  touched.items[index].label &&
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].label && (
                                    <FormHelperText error>{errors.items[index].label}</FormHelperText>
                                  )}
                              </Stack>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                <Select value={item.type} name={`items.${index}.type`} onChange={handleChange}>
                                  <MenuItem value="input-text">Text Input</MenuItem>
                                  <MenuItem value="input-number">Number Input</MenuItem>
                                  <MenuItem value="radio">Radio</MenuItem>
                                  <MenuItem value="text-area">Text Area</MenuItem>
                                  <MenuItem value="select">Select</MenuItem>
                                  <MenuItem value="checkbox">Checkbox</MenuItem>
                                  <MenuItem value="date-picker">Date Picker</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <Stack spacing={2}>
                                <InputLabel htmlFor={`name-${index}`}>Name</InputLabel>
                                <OutlinedInput
                                  id={`name-${index}`}
                                  fullWidth
                                  name={`items.${index}.name`}
                                  value={item.name}
                                  onChange={handleChange}
                                  error={Boolean(
                                    errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].name &&
                                      touched.items &&
                                      touched.items[index] &&
                                      touched.items[index].name
                                  )}
                                />
                                {touched.items &&
                                  touched.items[index] &&
                                  touched.items[index].name &&
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].name && (
                                    <FormHelperText error>{errors.items[index].name}</FormHelperText>
                                  )}
                              </Stack>
                            </Grid>
                            {["radio", "select", "checkbox"].includes(item.type) && (
                              <Grid item xs={12}>
                                <InputLabel>Options</InputLabel>
                                <FieldArray name={`items.${index}.options`}>
                                  {({ push, remove }) => (
                                    <Stack spacing={1}>
                                      {item.options.map((option, optionIndex) => (
                                        <Chip key={optionIndex} label={option} onDelete={() => remove(optionIndex)} />
                                      ))}
                                      <OutlinedInput
                                        fullWidth
                                        placeholder="Enter option"
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            e.preventDefault();
                                            push(e.target.value);
                                            e.target.value = "";
                                          }
                                        }}
                                      />
                                    </Stack>
                                  )}
                                </FieldArray>
                              </Grid>
                            )}
                            <Grid item xs={12} sx={{ my: 4 }}>
                              <Button fullWidth variant="outlined" color="error" onClick={() => remove(index)}>
                                Remove Item
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <Stack spacing={4} justifyContent="center">
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => push({ label: "", type: "", name: "", options: [] })}
                            >
                              Add Item
                            </Button>
                            <Button fullWidth variant="contained" color="primary" type="submit">
                              Save
                            </Button>
                          </Stack>
                        </Grid>
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </>
          )}
        </Formik>
      )}
    </Grid>
  );
};

export default FormComponent;
