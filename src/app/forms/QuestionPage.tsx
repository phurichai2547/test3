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
import { useTheme } from "@mui/material/styles"; 

const QuestionPage = ({ questionId }: { questionId: number }) => {
  const theme = useTheme(); // ดึงธีม
  const [choices, setChoices] = useState([{ id: 1 }]);
  // สถานะ choices ถูกใช้เพื่อเก็บข้อมูลของ choices ที่ user สามารถเพิ่มหรือลบได้ในแต่ละคำถาม
  // โดยเริ่มต้นตั้งค่าเป็น id : 1 

  const handleAddChoice = () => {
    setChoices([...choices, { id: choices.length + 1 }]);
  };// เมื่อ user ได้คลิกปุ่ม "Add Choice", ฟังก์ชันนี้จะเพิ่มตัวเลือกใหม่
  //  ({ id: choices.length + 1 }) ไปยัง choices โดยการใช้ setChoices ซึ่งจะเพิ่มค่า id ใหม่ให้กับตัวเลือกใหม่


  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`, // ใช้สีจากธีม
        padding: 2, // ใช้ spacing จากธีม
        marginBottom: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: 2, color: theme.palette.text.primary }}
      >
        Question {questionId}
      </Typography>

      <TextField
        label="Question*"
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

      {choices.map((choice) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
          }}
          key={choice.id}
        >
          <Radio
            checkedIcon={
              <CheckCircle sx={{ color: theme.palette.success.main }} />
            }
          />
          <TextField
            label={`Description*`}
            variant="outlined"
            fullWidth
            sx={{
              marginRight: 2,
              "& .MuiInputLabel-root": {
                fontFamily: theme.typography.fontFamily,
              },
              "& .MuiOutlinedInput-root": {
                fontFamily: theme.typography.fontFamily,
              },
            }}
          />
          <IconButton >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        color="warning"
        sx={{
          display: "flex",
          gap: 1,
          fontFamily: theme.typography.fontFamily, // ใช้ฟอนต์จากธีม
        }}
        onClick={handleAddChoice}
      >
        <AddIcon />
        <p>{`Add Choice`}</p>
      </Button>

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button sx={{ gap: 1, color: theme.palette.text.primary }}>
          <ContentCopyIcon />
          <p>{`Duplicate`}</p>
        </Button>
        <Button sx={{ gap: 1, color: theme.palette.text.primary }}>
          <DeleteOutlineIcon />
          <p>{`Delete`}</p>
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPage;
