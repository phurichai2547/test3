"use client";

import { Box, Container, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import FormPage from "./forms/FormPage";
import theme from "./theme";

const page = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            padding: 2,
          }}
        >
          <Container maxWidth="md" sx={{ flexGrow: 1 }}>
            <FormPage />
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default page;
