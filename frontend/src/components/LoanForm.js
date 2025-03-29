// src/components/LoanForm.js
import React, { useState } from "react";
import { API } from "../api";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const LoanForm = () => {
  const [loan, setLoan] = useState({
    loan_number: "",
    loan_type: "",
    borrower: "",
    borrower_address: "",
    co_borrower: "",
    co_borrower_address: "",
    current_dpd: "",
    sanctioned_amount: "",
    region: "",
    stage: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  // API Call to Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("loans/", loan);
      console.log("Loan Created Successfully:", response.data);
      alert("Loan submitted successfully!");

      // Reset form after successful submission
      setLoan({
        loan_number: "",
        loan_type: "",
        borrower: "",
        borrower_address: "",
        co_borrower: "",
        co_borrower_address: "",
        current_dpd: "",
        sanctioned_amount: "",
        region: "",
        stage: "",
      });
    } catch (error) {
      console.error("Error submitting loan:", error);
      alert("Error submitting loan. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Upload Loan Data
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Image */}
        <Grid item xs={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="data:image/jpeg;base64,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"
              alt="Loan Process"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Grid>

        {/* Right Column - Input Fields */}
        <Grid item xs={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {Object.entries(loan).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <TextField
                    fullWidth
                    label={key.replace(/_/g, " ").toUpperCase()}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button variant="contained" color="primary" type="submit">
                Submit Loan
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoanForm;
