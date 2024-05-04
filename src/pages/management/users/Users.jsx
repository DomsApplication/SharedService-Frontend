import { useGetAdminObjectQuery } from "@/app/features/admin-apis/admin-object-api-slice";
import {
  useDeleteAdminRepoMutation,
  useGetAdminRepoQuery,
} from "@/app/features/admin-apis/admin-repo-api-slice";
import HeadingNav from "@/components/heading-nav";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Skeleton,
  TableContainer,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.authToken);
  const {
    data: objectData,
    isError: isObjectError,
    isLoading: isObjectLoading,
    error: objectError,
    isSuccess: isObjectSuccess,
  } = useGetAdminObjectQuery("user", { skip: !token });
  const { data, isError, isLoading, error, isSuccess } = useGetAdminRepoQuery(
    "user",
    { skip: !token },
  );
  const [deleteUserMutation] = useDeleteAdminRepoMutation();

  // Delete dialog state
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  // Action handlers
  const handleOpenDeleteDialog = (id) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUserMutation(selectedUserId).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const navigateToUserEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const navigateToAddUser = () => {
    navigate("/users/new");
  };

  if (isObjectError || isError) {
    const message =
      objectError?.data?.message ||
      objectError?.data?.error ||
      error?.data?.message ||
      error?.data?.error;
    toast.error(message);
    return null;
  }

  if (isLoading || isObjectLoading) {
    return <Skeleton variant="rectangular" width={"100%"} height={500} />;
  }
  if (isSuccess && isObjectSuccess) {
    const keysOfObject = Object.keys(objectData.properties).filter(
      (key) => objectData.properties[key].display_ui,
    );
    let columns = keysOfObject.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
      width: 150,
      editable: false,
    }));

    // Add actions column
    columns.push({
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigateToUserEdit(params.id)}
            color="inherit"
          />
          ,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpenDeleteDialog(params.id)}
            color="inherit"
          />
          ,
        </>,
      ],
    });

    columns = [
      { field: "id", headerName: "ID", width: 90, editable: false },
      ...columns,
    ];

    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <HeadingNav
          navLinks={[
            { link: "/", label: "Dashboard" },
            { link: "/users", label: "Users" },
          ]}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {objectData.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {objectData.description}
            </Typography>
          </Box>

          <Button
            sx={{ mb: 2 }}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={navigateToAddUser}
          >
            Add User
          </Button>
        </Box>

        <TableContainer
          sx={{ height: 500, width: "100%", p: 1 }}
          component={Paper}
        >
          <DataGrid
            sx={{
              cursor: "pointer",
            }}
            rows={data.map((item) => ({ ...item, id: item.user_id }))}
            columns={columns}
            initialState={{
              pagination: {
                pageSize: 5,
              },
              density: "compact",
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            checkboxSelection
            disableSelectionOnClick
            disableColumnResize
            disableDensitySelector
            disableEval
          />
        </TableContainer>

        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="primary"
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default Users;
