"use client";

import { Box, Container, ThemeProvider } from "@mui/material";
import FormPage from "./forms/FormPage";
import theme from "./theme";

const page = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          padding: 2,
        }}
      >
        <Container maxWidth="xl" sx={{ flexGrow: 1, padding: "0 !important" }}>
          <FormPage />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default page;
