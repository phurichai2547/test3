"use client";

import { Box, Container, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import FormPage from "./forms/FormPage";
import theme from "./theme";

// เพิ่มฟังก์ชัน handleSave ใน page.tsx
const page = () => {
  const handleSave = () => {
    console.log("Save clicked");
    // คุณสามารถเพิ่มการบันทึกหรือการตรวจสอบที่นี่
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* ส่งฟังก์ชัน onSave ไปให้ Navbar */}
        <Navbar onSave={handleSave} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            padding: 2,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{ flexGrow: 1, padding: "0 !important" }}
          >
            <FormPage />
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default page;
