"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ใช้ useTheme hook สำหรับดึงธีม

export default function Navbar() {
  const theme = useTheme(); // ใช้ useTheme hook เพื่อดึงธีม

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: theme.palette.background.default, // ใช้สีพื้นหลังจากธีม
          borderBottom: `1px solid ${theme.palette.divider}`, // ใช้สี divider จากธีม
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            fontFamily={theme.typography.fontFamily} // ใช้ฟอนต์จากธีม
            sx={{
              flexGrow: 1,
              color: theme.palette.text.primary, // ใช้สีข้อความจากธีม
              paddingBottom: 1,
            }}
          >
            🦊 Foxbith Questionnaire
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar
        position="static"
        sx={{
          bgcolor: theme.palette.background.default, // ใช้สีพื้นหลังจากธีม
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`, // ใช้สี divider จากธีม
        }}
      >
        <Toolbar sx={{ p: "12px", justifyContent: "end" }}>
          <Button
            variant="outlined"
            color="warning"
            sx={{
              width: "89px",
              height: "48px",
              borderRadius: 2,
              fontFamily: theme.typography.fontFamily, // ใช้ฟอนต์จากธีม
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{
              width: "180px",
              height: "48px",
              borderRadius: 2,
              fontFamily: theme.typography.fontFamily, // ใช้ฟอนต์จากธีม
              ml: "12px",
            }}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
