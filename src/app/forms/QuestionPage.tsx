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

const QuestionPage = ({ questionId }: { questionId: number }) => {
  const [choices, setChoices] = useState([{ id: 1 }]);

  const handleAddChoice = () => {
    setChoices([...choices, { id: choices.length + 1 }]);
  };

  const handleDeleteChoice = (id: number) => {
    setChoices(choices.filter((choice) => choice.id !== id));
  };

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

      <TextField
        label="Question*"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {choices.map((choice) => (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          key={choice.id}
        >
          <Radio checkedIcon={<CheckCircle sx={{ color: "#00c62b" }} />} />
          <TextField
            label={`Description*`}
            variant="outlined"
            fullWidth
            sx={{ marginRight: 2 }}
          />
          <IconButton onClick={() => handleDeleteChoice(choice.id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        color="warning"
        sx={{ display: "flex", gap: 1 }}
        onClick={handleAddChoice}
      >
        <AddIcon />
        <p style={{ fontFamily: "Prompt" }}>Add Choice</p>
      </Button>

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
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
  );
};

export default QuestionPage;
