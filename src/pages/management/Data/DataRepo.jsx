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
import { useNavigate, useParams } from "react-router-dom";

const DataRepo = () => {
  const objectId = useParams().objectId;
  const navigate = useNavigate();
  const {
    data: objectData,
    isError: isObjectError,
    isLoading: isObjectLoading,
    error: objectError,
    isSuccess: isObjectSuccess,
  } = useGetAdminObjectQuery(objectId);
  const { data, isError, isLoading, error, isSuccess } =
    useGetAdminRepoQuery(objectId);
  const [deleteMutation] = useDeleteAdminRepoMutation();

  // console.log("objectData", objectData);
  // console.log("data", data);
  // console.log("id", objectData?.properties.entity.uniquekey);
  // Delete dialog state
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  // Action handlers
  const handleOpenDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMutation({ id: objectId, subId: selectedId }).unwrap();
      toast.success(`${objectData.title} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${objectData.title}`);
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const navigateToEdit = (id) => {
    navigate(`/data-management/${objectId}/repo/${id}`);
  };

  const navigateToAdd = () => {
    navigate(`/data-management/${objectId}/repo/new`);
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
      (key) => objectData.properties[key].display_ui
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

      getActions: (params) => [
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigateToEdit(params.id)}
            color="inherit"
          />

          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpenDeleteDialog(params.id)}
            color="inherit"
          />
        </>,
      ],
    });
    // classname for column header
    columns.forEach((column) => {
      column.headerClassName = " text-lg font-extrabold";
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
            { link: "/data-management", label: "Data Management" },
            { link: `/data-management/${objectId}/repo`, label: Object.title },
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
            onClick={navigateToAdd}
          >
            Add {objectData.title}
          </Button>
        </Box>

        <TableContainer
          sx={{ width: "100%", p: 1 }}
          component={Paper}
          className="*:text-center *:text-[0.875rem] *:font-medium"
        >
          <DataGrid
            sx={{
              cursor: "pointer",
            }}
            rows={data.map((item) => ({
              ...item,
              id: item[objectData?.properties.entity.uniquekey],
              //  add class to rows
              className: " text-sm font-medium text-gray-900",
            }))}
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
              Are you sure you want to delete this {objectData.title}?
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

export default DataRepo;
