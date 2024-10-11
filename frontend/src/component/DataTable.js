import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  TableSortLabel,
  Checkbox,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreOptions from "./MoreOptions";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers, deleteUsers } from "../redux/actions/userActions";

const DataTable = ({ columns, rows }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  //const [filteredRows, setFilteredRows] = useState(rows);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    /*
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
    */
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((user) => user.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDelete = () => {
    dispatch(deleteUsers(selected));
    setSelected([]);
    dispatch(fetchUsers()); // Refresh the table after deleting users
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (columnId) => {
    const direction =
      sortConfig.key === columnId && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key: columnId, direction });
  };

  const filteredAndSortedRows = React.useMemo(() => {
    let filteredRows = rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (sortConfig.key) {
      filteredRows.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredRows;
  }, [rows, searchQuery, sortConfig]);

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
        sx={{ mt: 1, mb: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={3}>
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/users/add")}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            Add
          </Button>

          <IconButton
            sx={{ m: 1 }}
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleDelete}
            disabled={selected.length === 0}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <DeleteIcon />
          </IconButton>
          <MoreOptions />
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all users" }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, row.id)}
                        inputProps={{
                          "aria-labelledby": `enhanced-table-checkbox-${index}`,
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.id === "id" ? (
                          <Link to={`/users/edit/${row[column.id]}`}>
                            {row[column.id]}
                          </Link>
                        ) : typeof row[column.id] === "boolean" ? (
                          row[column.id] ? (
                            "Yes"
                          ) : (
                            "No"
                          )
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={filteredAndSortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
