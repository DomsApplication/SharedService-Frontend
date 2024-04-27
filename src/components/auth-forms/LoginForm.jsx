import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { Formik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "@/app/features/auth-api-slice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/app/features/auth-token-slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const [LoginUser, { isLoading }] = useLoginMutation();
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {isLoading ? (
        <Box display={"flex"} gap={2}>
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
          <Skeleton variant="rounded" width={"50%"} height={"40px"} />
        </Box>
      ) : (
        <>
          <Formik
            initialValues={{
              username: "system",
              password: "Password1#",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("username is required")
                .min(5)
                .max(20),
              password: Yup.string()
                .required("Password is required")
                .min(5)
                .max(20),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              // try {
              //   await LoginUser(values).unwrap();
              //   toast.success("Login Successful");
              //   navigate("/");
              // } catch (err) {
              //   toast.error(err?.data?.message || "Login failed");
              //   setErrors({ submit: err?.data?.message || "Login failed" });
              //   setStatus({ success: false });
              // } finally {
              //   setSubmitting(false);
              // }
              await LoginUser(values)
                .unwrap()
                .then((res) => {
                  toast.success("Login Successful");
                  console.log(res);
                  dispatch(login({ authToken: res.token }));
                  navigate("/");
                  setSubmitting(false);
                })
                .catch((err) => {
                  toast.error(err?.data?.message || "Login failed");
                  setErrors({ submit: err?.data?.message || "Login failed" });
                  setStatus({ success: false });
                  setSubmitting(false);
                });
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
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="username-login">UserName</InputLabel>
                      <OutlinedInput
                        id="username-login"
                        type="username"
                        value={values.username}
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter username"
                        fullWidth
                        error={Boolean(touched.username && errors.username)}
                      />
                      {touched.username && errors.username && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-username-login"
                        >
                          {errors.username}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="password-login"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                      />
                      {touched.password && errors.password && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-password-login"
                        >
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) =>
                              setChecked(event.target.checked)
                            }
                            name="checked"
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <Typography variant="h6">
                            Keep me signed in
                          </Typography>
                        }
                      />
                      <Link
                        variant="h6"
                        component={RouterLink}
                        to=""
                        color="text.primary"
                      >
                        Forgot Password?
                      </Link>
                    </Stack>
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
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default LoginForm;
