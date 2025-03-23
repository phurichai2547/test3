"use client";

import {
  Box,
  TextField,
  Button,
  Radio,
  Typography,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const Question = ({ questionId }: { questionId: number }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Question {questionId}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Radio checkedIcon={<CheckCircle sx={{ color: "#00c62b" }} />} />
        <TextField
          label={`Description*`}
          variant="outlined"
          fullWidth
          sx={{ marginRight: 2 }}
        />
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button color="warning" sx={{ display: "flex", gap: 1 }}>
            <AddIcon />
            <p style={{ fontFamily: "Prompt" }}>Add Choice</p>
          </Button>
          <Box
            sx={{
              mt: 2,
              display: "flex",
            }}
          >
            <Button sx={{ gap: 1, color: "black" }}>
              <ContentCopyIcon />
              <p style={{ fontFamily: "Prompt" }}>Duplicate</p>
            </Button>
            <Button sx={{ gap: 1, color: "black" }}>
              <DeleteOutlineIcon />
              <p style={{ fontFamily: "Prompt" }}>Delete</p>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Form = () => {
  const [questionCount] = useState(1);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,

        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ width: "100%", backgroundColor: "white", padding: 3 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            paddingBottom: 1,
          }}
        >
          Questionnaire Detail
        </Typography>
        <TextField
          label="Name*"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
          }}
        />

        <TextField
          label="Question*"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {[...Array(questionCount)].map((_, index) => (
          <Question key={index} questionId={index + 1} />
        ))}

        <Button
          color="warning"
          variant="outlined"
          sx={{
            width: "100%",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          <AddIcon />
          <p style={{ fontFamily: "Prompt" }}>Add Question</p>
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
