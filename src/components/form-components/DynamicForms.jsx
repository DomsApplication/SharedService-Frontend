import { useTheme } from "@emotion/react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik } from "formik";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const DynamicForm = ({ formConfig, label, initialValues = {}, onSubmitCreate, onSubmitEdit, id = "", onClose }) => {
  console.log(initialValues);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(() => theme.breakpoints.down("sm"));

  const formItems = formConfig["items"];
  const isEdit = id !== "" ? true : false;
  const successMessage = isEdit ? `Update ${label} SuccessFul ` : `Add ${label} SuccessFul`;
  const errorMessage = isEdit ? `Failed to  Update ${label} ` : `Failed to Add ${label}`;
  const buttonText = isEdit ? `Update ${label}` : `Add ${label}`;

  return (
    <Formik
      initialValues={isEdit ? initialValues : {}}
      onSubmit={async (values) => {
        console.log(values);
        const isAllFiled = formItems.some((item) => {
          if (!values[item.name]) {
            return true;
          }
        });
        if (isAllFiled) {
          toast.error(" Please fill All the fields");
        }
        if (!isAllFiled) {
          console.log("Form submitted:", values);
          try {
            isEdit ? await onSubmitEdit({ id, ...values }).unwrap() : await onSubmitCreate(values).unwrap();
            toast.success(successMessage);
          } catch (error) {
            toast.error(error?.data?.message || errorMessage);
            console.log(error);
          } finally {
            onClose();
          }
        }
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {formItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                {item.type === "input-text" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={item.label}
                    name={item.name}
                    value={values[item.name] || ""}
                    onChange={handleChange}
                  />
                )}
                {item.type === "input-number" && (
                  <OutlinedInput
                    fullWidth
                    type="number"
                    placeholder={item.label}
                    name={item.name}
                    value={values[item.name]}
                    onChange={handleChange}
                  />
                )}
                {item.type === "text-area" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={item.label}
                    multiline
                    rows={4}
                    name={item.name}
                    value={values[item.name]}
                    onChange={handleChange}
                  />
                )}
                {item.type === "select" && (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{item.label}</InputLabel>
                    <Select value={values[item.name] || ""} onChange={handleChange} label={item.label} name={item.name}>
                      {item.options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {item.type === "radio" && (
                  <RadioGroup name={item.name} value={values[item.name]} onChange={handleChange}>
                    <Stack direction={isSmallScreen ? "column" : "row"}>
                      {item.options.map((option, index) => (
                        <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                      ))}
                    </Stack>
                  </RadioGroup>
                )}
                {item.type === "checkbox" && (
                  <Stack direction={isSmallScreen ? "column" : "row"}>
                    {item.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            name={item.name}
                            checked={values[item.name]?.includes(option) || false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const newValue = checked
                                ? [...values[item.name], option]
                                : values[item.name].filter((val) => val !== option);
                              handleChange({
                                target: {
                                  name: item.name,
                                  value: newValue,
                                },
                              });
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </Stack>
                )}
                {item.type === "date-picker" && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={item.label}
                      name={item.name}
                      value={values[item.name]}
                      onChange={(newValue) => {
                        handleChange({
                          target: {
                            name: item.name,
                            value: newValue,
                          },
                        });
                      }}
                      textField={(props) => <TextField {...props} fullWidth variant="outlined" />}
                    />
                  </LocalizationProvider>
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type={"submit"} variant="contained" color="primary" style={{ marginRight: "10px" }}>
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

DynamicForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmitCreate: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  formConfig: PropTypes.object.isRequired,
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default DynamicForm;
