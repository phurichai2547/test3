import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "white",  borderBottom:"1px solid #d3d3d3"}}>
          <Toolbar>
            <Typography
              variant="h6"
              fontFamily={"Prompt"}
              sx={{
                flexGrow: 1,
                color: "black",
                paddingBottom: 1,
              }}
            >
              🦊 Foxbith Questionnaire
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "none", borderBottom:"1px solid #d3d3d3"}}>
          <Toolbar sx={{ p: "12px", justifyContent: "end" }}>
            <Button
              variant="outlined"
              color="warning"
              sx={{
                width: "89px",
                height: "48px",
                borderRadius: 2,
                fontFamily: "Prompt",
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
                fontFamily: "Prompt",
                ml: "12px",
              }}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
