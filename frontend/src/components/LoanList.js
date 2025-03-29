import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Checkbox,
  IconButton,
  TablePagination,
} from "@mui/material";
import { API } from "../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [filters, setFilters] = useState([]);
  const [searchColumn, setSearchColumn] = useState("loan_number");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoans, setSelectedLoans] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Columns for Dropdown
  const columnOptions = [
    { label: "Loan Number", value: "loan_number" },
    { label: "Loan Type", value: "loan_type" },
    { label: "Borrower", value: "borrower" },
    { label: "Borrower Address", value: "borrower_address" },
    { label: "Co-Borrower", value: "co_borrower" },
    { label: "Co-Borrower Address", value: "co_borrower_address" },
    { label: "Current DPD", value: "current_dpd" },
    { label: "Sanctioned Amount", value: "sanctioned_amount" },
    { label: "Region", value: "region" },
    { label: "Stage", value: "stage" },
  ];

  // ✅ Fetch loans from API
  const fetchLoans = async () => {
    try {
      const response = await API.get("loans/");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // ✅ Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ Add Filter
  const addFilter = () => {
    if (searchTerm.trim()) {
      const newFilter = { column: searchColumn, value: searchTerm };
      setFilters((prev) => [...prev, newFilter]);
      setSearchTerm("");
    }
  };

  // ✅ Remove Filter
  const removeFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Clear All Filters
  const clearFilters = () => {
    setFilters([]);
  };

  // ✅ Handle Checkbox Selection
  const toggleSelect = (id) => {
    setSelectedLoans((prev) =>
      prev.includes(id) ? prev.filter((loanId) => loanId !== id) : [...prev, id]
    );
  };

  // ✅ Handle Delete Loan
  const deleteLoan = async (id) => {
    try {
      await API.delete(`loans/${id}/`);
      setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id));
      console.log("Loan deleted successfully");
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  // ✅ Handle Edit Loan
  const startEditing = (loan) => {
    setEditingLoan({ ...loan });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingLoan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    if (!editingLoan) return;

    console.log("Saving Loan:", editingLoan);

    try {
      const updatedData = { ...editingLoan };

      // Call the API to update the loan
      await API.put(`loans/${editingLoan.id}/`, updatedData);

      // ✅ Update local state immediately without waiting for API re-fetch
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.id === editingLoan.id ? { ...loan, ...updatedData } : loan
        )
      );

      // Clear editing mode
      setEditingLoan(null);
    } catch (error) {
      console.error("Error updating loan:", error.response?.data || error);
    }
  };

  // ✅ Filter Logic
  const filteredLoans = loans.filter((loan) =>
    filters.every((filter) =>
      loan[filter.column]
        ?.toString()
        .toLowerCase()
        .includes(filter.value.toLowerCase())
    )
  );

  // ✅ Apply pagination
  const paginatedLoans = filteredLoans.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Loan Portfolio
      </Typography>

      {/* Search & Filter Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Search By</InputLabel>
            <Select
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              {columnOptions.map((col) => (
                <MenuItem key={col.value} value={col.value}>
                  {col.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={`Search ${searchColumn.replace(/_/g, " ")}`}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={addFilter}>
            Add Filter
          </Button>
          {filters.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </Box>
      </Box>

      {/* Active Filters */}
      <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {filters.map((filter, index) => (
          <Chip
            key={index}
            label={`${filter.column.replace(/_/g, " ")}: ${filter.value}`}
            onDelete={() => removeFilter(index)}
            color="primary"
          />
        ))}
      </Box>

      {/* Loan Table */}
      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }} />
              {columnOptions.map((header) => (
                <TableCell
                  key={header.value}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {header.label}
                </TableCell>
              ))}
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedLoans.map((loan) => (
              <TableRow key={loan.id} hover>
                <TableCell>
                  <Checkbox
                    checked={selectedLoans.includes(loan.id)}
                    onChange={() => toggleSelect(loan.id)}
                  />
                </TableCell>

                {columnOptions.map((col) => (
                  <TableCell key={`${loan.id}-${col.value}`}>
                    {editingLoan?.id === loan.id ? (
                      <TextField
                        name={col.value}
                        value={editingLoan[col.value] || ""}
                        onChange={handleEditChange}
                        size="small"
                      />
                    ) : (
                      loan[col.value]
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  {editingLoan?.id === loan.id ? (
                    <Button onClick={saveEdit} color="success">
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => startEditing(loan)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteLoan(loan.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredLoans.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default LoanList;
