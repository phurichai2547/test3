"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface NavbarProps {
  onSave: () => void; // รับฟังก์ชัน onSave จาก props
}

export default function Navbar({ onSave }: NavbarProps) {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar แรก */}
      <AppBar
        position="static"
        sx={{
          bgcolor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            fontFamily={theme.typography.fontFamily}
            sx={{
              flexGrow: 1,
              color: theme.palette.text.primary,
              paddingBottom: 1,
            }}
          >
            🦊 Foxbith Questionnaire
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navbar ที่สอง */}
      <AppBar
        position="static"
        sx={{
          bgcolor: theme.palette.background.default,
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
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
              fontFamily: theme.typography.fontFamily,
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
              fontFamily: theme.typography.fontFamily,
              ml: "12px",
            }}
            onClick={onSave} // เมื่อคลิกปุ่ม Save จะเรียก onSave
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
