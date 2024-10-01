import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Add this import
import { fetchUsers } from "../../redux/actions/userActions"; // Add this import
import PageTitle from "../../component/PageTitle";
import DataTable from "../../component/DataTable";
import { Box, Grid, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

const page_title = {
  title: "Users",
  navLinks: [{ link: "/dashboard", label: "Dashboard" }],
};

const Users = () => {
  const dispatch = useDispatch(); // Use useDispatch hook
  const { users, loading, toast } = useSelector((state) => state.user); // Get users and loading from Redux store

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // Fetch users from API using Redux
  useEffect(() => {
    console.log("Called fetchUsers...........");
    dispatch(fetchUsers()); // Fetch users from backend
  }, [dispatch]);

  const handleCloseToast = () => {
    dispatch({ type: "HIDE_TOAST" });
  };

  // Set columns and rows based on fetched users
  useEffect(() => {
    if (users.length > 0) {
      const keys = Object.keys(users[0]);
      const cols = keys.map((key) => ({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
      }));
      setColumns(cols);
      setRows(users);
    }
  }, [users]); // Update rows and columns when users change

  return (
    <Box role="presentation" sx={{ p: 0 }}>
      <PageTitle {...page_title} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        sx={{ pt: 1, pb: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {/** Table */}
        <Grid item xs={12}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <DataTable columns={columns} rows={rows} />
          )}
        </Grid>
      </Grid>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={10000} // 10 seconds
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Users;
