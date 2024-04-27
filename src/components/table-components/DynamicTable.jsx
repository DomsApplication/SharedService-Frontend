import { AddCircle, DeleteOutlined, LinkOutlined } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";
import RowActions from "./RowActions";
import SearchAccToIndex from "./SearchAccToIndex";
import SearchIndexSelectForm from "./SearchIndexSelect";

import AddEditEntry from "./Add-Edit-Entry";
import { useState } from "react";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function DynamicTable({
  tableColumns,
  tableData,
  Search,
  label,
  deleteLabelName,
  onDeleteConform,
  onSubmitEdit,
  itemForm,
  onSubmitCreate,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState(tableData);
  const [selectIndex, setSelectIndex] = React.useState(Search.searchFields[0]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [editId, setEditId] = useState("");

  const onHandleEdit = (id) => {
    setEditId(id), handleOpenAdd();
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
  React.useMemo(() => {
    const regexPattern = new RegExp(search, "i"); // "i" flag for case-insensitive matching
    const filterData = tableData.filter((row) => regexPattern.test(row[selectIndex]));
    setData(filterData);
  }, [tableData, search, selectIndex]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <AddEditEntry
        onOpen={handleOpenAdd}
        onClose={handleCloseAdd}
        open={openAdd}
        label={label}
        itemform={itemForm}
        onSubmitCreate={onSubmitCreate}
        onSubmitEdit={onSubmitEdit}
        id={editId}
        initialValues={tableData.find((item) => item._id === editId)}
      />
      <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} gap={4} justifyContent={"space-between"}>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          justifyContent={"flex-start"}
          px={4}
          py={2}
        >
          <SearchAccToIndex search={search} setSearch={setSearch} />
          <SearchIndexSelectForm
            searchFields={Search.searchFields}
            selectIndex={selectIndex}
            setSelectIndex={setSelectIndex}
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          justifyContent={"flex-start"}
          px={4}
          py={2}
        >
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={() => {
              handleOpenAdd();
            }}
          >
            Add {label}{" "}
          </Button>
          <Button color="error" variant="outlined" startIcon={<DeleteOutlined />}>
            Delete {label}
          </Button>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {tableColumns.map((item, index) => (
              <TableCell key={index} align="center">
                {item.header}
              </TableCell>
            ))}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{}}>
                {tableColumns.map((column, columnIndex) => (
                  <TableCell key={columnIndex} align="center" sx={{ px: { xs: 2, md: 3, lg: 4 }, py: 2 }}>
                    {column.type === "date" ? new Date(row[column.field]).toDateString() : ""}
                    {column.type === "number" || column.type == "input-number"
                      ? new Intl.NumberFormat("en-IN").format(row[column.field])
                      : ""}
                    {column.type === "input-text" ||
                    column.type === "text" ||
                    column.type === "email" ||
                    column.type === "password" ||
                    column.type === "tel" ||
                    column.type === "url" ||
                    column.type === "search" ||
                    column.type === "time" ||
                    column.type === "datetime-local"
                      ? row[column.field]
                      : ""}
                    {column.type === "boolean" ? (row[column.field] ? "Yes" : "No") : ""}
                    {column.type === "object" ? JSON.stringify(row[column.field]) : ""}
                    {column.type === "array" ? JSON.stringify(row[column.field]) : ""}
                    {column.type === "null" ? "Null" : ""}
                    {column.type === "link" ? (
                      <Link to={row["link"]}>
                        <IconButton>
                          {" "}
                          <LinkOutlined />{" "}
                        </IconButton>
                      </Link>
                    ) : (
                      ""
                    )}
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ px: { xs: 2, md: 3, lg: 4 }, py: 2 }}>
                  <RowActions
                    onDeleteConform={onDeleteConform}
                    label={label}
                    deleteLabelName={deleteLabelName}
                    id={row["_id"]}
                    onHandleEdit={onHandleEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={tableColumns.length} />
            </TableRow>
          )}
          {data.length === 0 && (
            <TableRow sx={{ alignContent: "center", alignItems: "center" }}>
              <TableCell colSpan={tableColumns.length} sx={{ alignContent: "center", alignItems: "center" }}>
                No Result .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={tableColumns.length}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

DynamicTable.propTypes = {
  tableColumns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  Search: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onDeleteConform: PropTypes.func.isRequired,
  deleteLabelName: PropTypes.string.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  onSubmitCreate: PropTypes.func.isRequired,
  itemForm: PropTypes.arrayOf(PropTypes.object).isRequired,
};
