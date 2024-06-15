// Import all necessary modules and icons
import { useGetAdminObjectQuery } from "@/app/features/admin-apis/admin-object-api-slice";
import HeadingNav from "@/components/heading-nav";
import AddAttributesDialog from "@/components/Management-components/data/add-attributes-dialog";
import EditColumnsDrawerActions from "@/components/Management-components/data/edit-columns-DrawerActions";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// The main component
const DataObjectAddColumns = () => {
  const objectId = useParams().objectId;
  const { data, isLoading, isError, isSuccess, error } =
    useGetAdminObjectQuery(objectId);
  // The function for handling form submission will likely involve an API call

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error(
      error.data.message || error.data.error || "Something went wrong"
    );
    return <div>Error</div>;
  }
  if (isSuccess) {
    const columns = [
      {
        field: "propertyName",
        headerName: "Attribute Name",
        width: 200,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ whiteSpace: "pre-wrap" }}>
              <EditColumnsDrawerActions
                dataObject={data}
                label={params.row.label || ""}
                propertyName={params.value}
                description={params.row.description}
                display_ui={params.row.display_ui}
                required={params.row.required}
                unique={params.row.unique}
                type={params.row.type}
                searchable={params.row.searchable}
                minLength={params.row.minLength}
                maxLength={params.row.maxLength}
                pattern={params.row.pattern}
                ui_type={params.row.ui_type}
                options={params.row.options}
              />
            </span>
          </Box>
        ),
      },
      { field: "description", headerName: "Description", width: 200 },
      { field: "type", headerName: "Type", width: 130 },
      { field: "ui_type", headerName: "UI Type", width: 130 },
      // ... (define additional columns as needed)
    ];
    // add class name to clomuns  for custom styling
    columns.forEach((column) => {
      column.headerClassName = " text-lg font-extrabold";
    });
    return (
      <Box>
        <HeadingNav
          navLinks={[
            { link: "/", label: "Dashboard" },
            { link: "/data-management", label: "Data Management" },
            { link: `/data-management/${objectId}`, label: objectId },
          ]}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ my: 2 }}>
              Add Attributes to {data.title}
            </Typography>
            <Typography variant="subtitle2" sx={{ my: 2 }}>
              {data?.description}
            </Typography>
          </Box>
          {/*  add a button to add columns */}
          <AddAttributesDialog dataObject={data} />
        </Box>

        {/* DataGrid to display values */}
        <Box sx={{ height: 400, width: "100%", my: 2 }}>
          <DataGrid
            className="*:text-center *:text-[0.875rem] *:font-medium"
            rows={Object.entries(data?.properties || []).map(
              ([key, value]) => ({
                id: key,
                propertyName: key,
                ...value,
              })
            )}
            initialState={{
              pageSize: 5,
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 25]}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            disableDensitySelector
            disableRowSelectionOnClick
            autoHeight
            sx={{ my: 2 }}
          />
        </Box>
      </Box>
    );
  }
};

export default DataObjectAddColumns;
