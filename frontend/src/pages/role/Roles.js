import * as React from "react";
import PageTitle from "../../component/PageTitle";
import GridTable from "../../component/GridTable";
import { Box, Grid } from "@mui/material";

const page_title = {
  title: "Roles",
  navLinks: [{ link: "/dashboard", label: "Dashboard" }],
};

const Roles = () => {
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
        {/** Table */}
        <Grid item xs={12}>
          <GridTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Roles;
