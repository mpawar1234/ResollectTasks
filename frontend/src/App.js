// src/App.js
import React, { useState } from "react";
import LoanList from "./components/LoanList";
import LoanForm from "./components/LoanForm";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

const App = () => {
  const [page, setPage] = useState("list");

  const renderPage = () => {
    switch (page) {
      case "list":
        return <LoanList />;
      case "form":
        return <LoanForm />;
      default:
        return <LoanList />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <Box sx={{ p: 3 }}>{renderPage()}</Box>
      </Box>
    </Box>
  );
};

export default App;
