"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import QuestionPage from "./QuestionPage";

const FormPage = () => {
  const [questionCount, setQuestionCount] = useState(1);

  const handleAddQuestion = () => {
    setQuestionCount(questionCount + 1);
  };

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
        <Typography variant="h6" sx={{ marginBottom: 2, paddingBottom: 1 }}>
          Questionnaire Detail
        </Typography>
        <TextField
          label="Name*"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {[...Array(questionCount)].map((_, index) => (
          <QuestionPage key={index} questionId={index + 1} />
        ))}

        <Button
          color="warning"
          variant="outlined"
          sx={{ width: "100%", gap: 2, borderRadius: "8px" }}
          onClick={handleAddQuestion}
        >
          <AddIcon />
          <p style={{ fontFamily: "Prompt" }}>Add Question</p>
        </Button>
      </Box>
    </Box>
  );
};

export default FormPage;
