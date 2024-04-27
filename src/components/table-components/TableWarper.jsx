import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TableCard from "./TableCard";
const TableWarper = ({ tableHeading, tableDiscription, children }) => {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid item xs={12}>
        <TableCard>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {tableHeading}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {tableDiscription}
          </Typography>
          {children}
        </TableCard>
      </Grid>
    </Grid>
  );
};

TableWarper.propTypes = {
  tableHeading: PropTypes.string.isRequired,
  tableDiscription: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default TableWarper;
