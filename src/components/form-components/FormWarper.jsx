import PropTypes from "prop-types";

// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project import
import FormCard from "./FormCard";

// ==============================|| FORM - WRAPPER ||============================== //

const FormWrapper = ({ children, formHeading, formDescription }) => (
  <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
    <Grid item xs={12}>
      <FormCard>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {formHeading}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {formDescription}
        </Typography>
        {children}
      </FormCard>
    </Grid>
  </Grid>
);

FormWrapper.propTypes = {
  children: PropTypes.node,
  formHeading: PropTypes.string,
  formDescription: PropTypes.string,
};

export default FormWrapper;
