import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// third party
import { Formik } from "formik";
import * as Yup from "yup";

// project import
import {
  strengthColor,
  strengthIndicator,
} from "@/utilts/password-color-strength";

// assets
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import Skeleton from "@mui/material/Skeleton";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <>
      {/* {isLoading ? (
        <>
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
        </>
      ) : ( */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            companyName: "",
            password: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required("First Name is required"),
            lastName: Yup.string().max(255).required("Last Name is required"),
            companyName: Yup.string()
              .max(255)
              .required("Company Name is required "),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="firstName-signup">
                      First Name*
                    </InputLabel>
                    <OutlinedInput
                      id="firstName-login"
                      type="firstName"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error id="helper-text-firstName-signup">
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lastName-signup">
                      Last Name*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                      id="lastName-signup"
                      type="lastName"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Doe"
                      inputProps={{}}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error id="helper-text-lastName-signup">
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="companyName-signup">
                      Company Name
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.companyName && errors.company)}
                      id="company-signup"
                      value={values.companyName}
                      name="companyName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Demo Inc."
                      inputProps={{}}
                    />
                    {touched.companyName && errors.companyName && (
                      <FormHelperText error id="helper-text-companyName-signup">
                        {errors.companyName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">
                      Email Address*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="demo@companyName.com"
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="******"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 85,
                            height: 8,
                            borderRadius: "7px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    By Signing up, you agree to our &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#">
                      Terms of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#">
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create Account
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      {/* )} */}
    </>
  );
};

export default RegisterForm;
