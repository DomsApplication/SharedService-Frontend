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
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
const UserEditCreatePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const navigateToUserList = () => {
    navigate("/users");
  };

  const userId = params.id;

  const isEdit = userId !== "new" ? true : false;
  const title = isEdit ? "Edit User" : "Create User";
  const successMessage = isEdit
    ? `Update ${title} SuccessFul `
    : `Add ${title} SuccessFul`;
  const errorMessage = isEdit
    ? `Failed to  Update ${title} `
    : `Failed to Add ${title}`;
  const buttonText = isEdit ? `Update ${title}` : `Add ${title}`;

  const token = useSelector((state) => state.auth.authToken);
  const { data, isLoading, isError, isSuccess, error } = useGetAdminObjectQuery(
    "user",
    { skip: !token },
  );

  const {
    data: editData,
    isLoading: isEditLoading,
    isSuccess: isEditSuccess,
    isError: isEditError,
    error: editError,
  } = useGetOneAdminRepoQuery(
    { id: "user", subId: userId },
    { skip: !token || !isEdit },
  );

  const [createUser] = useCreateAdminRepoMutation();
  const [updateUser] = useUpdateAdminRepoMutation();
  if (isLoading || (isEdit && isEditLoading)) return <div>Loading ...</div>;
  if (isError) {
    toast.error(
      error.data.message || error.data.error || "Something went wrong",
    );
  }
  if (isEdit && isEditError) {
    toast.error(
      editError.data.message || editError.data.error || "Something went wrong",
    );
  }
  if (isSuccess || (isEdit && isEditSuccess)) {
    const initialValues = {};
    const validationSchemaFields = {};

    Object.entries(data.properties).forEach(([key, value]) => {
      if (value.display_ui) {
        // Set up initial form values based on whether it's an edit or create operation.

        if (isEdit) {
          initialValues[key] = editData[key];
        }
        // Set up Yup validation based on the schema.
        let schema = Yup.string();
        if (value.required) schema = schema.required("This field is required");
        if (value.type === "string" && value.minLength)
          schema = schema.min(value.minLength);
        if (value.type === "string" && value.maxLength)
          schema = schema.max(value.maxLength);
        if (value.pattern)
          schema = schema.matches(new RegExp(value.pattern), "Invalid format");

        validationSchemaFields[key] = schema;
      }
    });
    const validationSchema = Yup.object().shape(validationSchemaFields);
    const handleSubmit = async (values, actions) => {
      try {
        if (isEdit) {
          await updateUser({ entity: "user", ...values }).unwrap();
        } else {
          await createUser({ entity: "user", ...values }).unwrap();
        }
        toast.success(successMessage);
        navigateToUserList();
      } catch (error) {
        toast.error(error.data.message || error.data.error || errorMessage);
        console.error(error);
      } finally {
        actions.setSubmitting(false);
      }
    };
    return (
      <Box sx={{ width: "100%" }}>
        <HeadingNav
          navLinks={[
            {
              link: "/dash",
              label: "Dashboard",
            },
            {
              link: "/users",
              label: "Users",
            },
            {
              link: "/users/" + userId,
              label: title,
            },
          ]}
        />
        <Box>
          <Typography variant="h4">{title}</Typography>

          <Box sx={{ width: "100%" }} component={Paper}>
            {/*  form component here */}
          </Box>
        </Box>

        <Paper sx={{ margin: "20px", padding: "20px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <Box>
                  <Typography variant="h5">User Details</Typography>
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

                    return (
                      <Card key={key} sx={{ p: 2 }}>
                        <FormLabel
                          sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                          {key}
                        </FormLabel>
                        <Field
                          name={key}
                          as={TextField}
                          label={key}
                          type={"text"} // Handle the password field
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          disabled={
                            formikProps.isSubmitting ||
                            (key === "user_id" && isEdit)
                          } // Disable editing the user_id on edit
                          helperText={
                            formikProps.touched[key] && formikProps.errors[key]
                          }
                          error={
                            formikProps.touched[key] &&
                            Boolean(formikProps.errors[key])
                          }
                        />
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
                        </Typography>
                      </Card>
                    );
                  })}
                </Box>
                <Box display={"flex"} justifyContent={"end"} gap={2} mt={2}>
                  <Button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    onClick={navigateToUserList}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formikProps.isSubmitting}
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

export default UserEditCreatePage;
