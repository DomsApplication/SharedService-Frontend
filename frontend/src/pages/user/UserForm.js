import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import {
  addUser,
  updateUser,
  fetchUser,
} from "../../redux/actions/userActions";
import PageTitle from "../../component/PageTitle";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const page_title = {
  title: "User Form",
  navLinks: [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/users", label: "Users" },
  ],
};

const UserForm = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    systemUser: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchUser(email));
    } else {
      // Reset form values when switching to add mode
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        systemUser: false,
      });
    }
  }, [dispatch, email, isEditMode]);

  useEffect(() => {
    if (currentUser && isEditMode) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        systemUser: currentUser.systemUser,
      });
    }
  }, [currentUser, isEditMode]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = formData.firstName.match(/^[a-zA-Z0-9_]{6,20}$/)
      ? ""
      : "First Name is not valid";
    tempErrors.lastName = formData.lastName.match(/^[a-zA-Z0-9_]{6,20}$/)
      ? ""
      : "Last Name is not valid";
    tempErrors.email = formData.email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )
      ? ""
      : "Email is not valid";
    tempErrors.phoneNumber = formData.phoneNumber
      ? ""
      : "Phone Number is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      systemUser: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (isEditMode) {
        dispatch(updateUser(email, formData));
      } else {
        dispatch(addUser(formData));
      }
      navigate("/users");
    }
  };

  return (
    <Box role="presentation" sx={{ p: 0 }}>
      <PageTitle {...page_title} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        sx={{ mt: 1, mb: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12}>
          <Paper>
            {/** User Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <IconButton
                aria-label="delete"
                onClick={() => navigate("/users")}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
              <Button
                type="submit"
                sx={{ m: 1, flexGrow: 1 }}
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SaveIcon />}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {isEditMode ? "Update User" : "Add User"}
              </Button>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                sx={{ pt: 1, pb: 2 }}
              >
                <Grid item xs={12} md={6} lg={6} sx={{ p: 1 }}>
                  <TextField
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6} sx={{ p: 1 }}>
                  <TextField
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ p: 1 }}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mt: 1 }}
                    disabled={!!email}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ p: 1 }}>
                  <TextField
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ p: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.systemUser}
                        onChange={handleCheckboxChange}
                        name="systemUser"
                      />
                    }
                    label="System User"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
