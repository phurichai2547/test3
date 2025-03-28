"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useTheme } from "@mui/material/styles"; // ดึง theme มาใช้จากตรงนี้เด้อ
import QuestionPage from "./QuestionPage";

const FormPage = () => {
  const theme = useTheme(); // ดึงค่าธีม
  const [questionCount, setQuestionCount] = useState(1);
// สถานะ questionCount ใช้เพื่อเก็บจำนวนคำถามที่มีอยู่ในฟอร์ม
//  เริ่มต้นที่ 1 และสามารถเพิ่มจำนวนคำถามได้เมื่อผู้ใช้คลิกปุ่ม Add Question

  const handleAddQuestion = () => {
    setQuestionCount(questionCount + 1);
  };
  // เมื่อผู้ใช้คลิกปุ่ม "Add Question", ฟังก์ชันนี้จะเพิ่ม questionCount ขึ้นทีละ 1, ซึ่งทำให้แสดงคำถามเพิ่มขึ้นใน UI
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.default, // ใช้สีพื้นหลังจากธีม
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          padding: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            paddingBottom: 1,
            color: theme.palette.text.primary,
          }} // ใช้สีข้อความจากธีม
        >
          Questionnaire Detail
        </Typography>
        <TextField
          label="Name*"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiInputLabel-root": {
              fontFamily: theme.typography.fontFamily, // ใช้ฟอนต์จากธีม
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: theme.typography.fontFamily, // ใช้ฟอนต์จากธีม
            },
          }}
        />

        {[...Array(questionCount)].map((_, index) => (
          <QuestionPage key={index} questionId={index + 1} />
        ))} 
         {/* เมื่อ questionCount เพิ่มขึ้น, เราจะสร้างจำนวน QuestionPage ตามจำนวนคำถามที่มีอยู่ ใช้การทำซ้ำผ่าน map
           โดยในแต่ละ QuestionPage จะได้รับ questionId เป็นค่าตัวแปรที่เพิ่มขึ้นต่อไป*/}

        <Button
          color="warning"
          variant="outlined"
          sx={{
            width: "100%",
            gap: 2,
            borderRadius: "8px",
            fontFamily: theme.typography.fontFamily, // ใช้ฟอนต์จากธีม
            borderColor: theme.palette.primary.main, // ใช้สีหลักจากธีม
          }}
          onClick={handleAddQuestion}
        >
          <AddIcon />
          <p>{`Add Question`}</p>
        </Button>
      </Box>
    </Box>
  );
};

export default FormPage;
