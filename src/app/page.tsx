import { Box, Container } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import FormPage from "./forms/FormPage";

const Home = () => {
  return (
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
  );
};

export default Home;
