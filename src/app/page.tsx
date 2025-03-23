import { Box, Container } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import Form from "./forms/Form";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
        <Container maxWidth="md" sx={{ flexGrow: 1 }}>
          <Form />
        </Container>
      </Box>
    </div>
  );
};

export default Home;
