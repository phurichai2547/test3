"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Radio,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react"; // ใช้ useState hook สำหรับการจัดการ state
import { useTheme } from "@mui/material/styles"; // ใช้ useTheme hook เพื่อดึงธีม
import { Controller, useFormContext } from "react-hook-form"; // ใช้ Controller และ useFormContext จาก react-hook-form เพื่อจัดการฟอร์ม

// กำหนด interface สำหรับ Choice (ตัวเลือกคำตอบ)
interface Choice {
  description: string; // คำอธิบายของตัวเลือก
  isAnswer: boolean; // กำหนดว่าเป็นคำตอบที่ถูกต้องหรือไม่
}

// กำหนด interface สำหรับ Question (คำถาม)
interface Question {
  question: string; // คำถาม
  choices: Choice[]; // ตัวเลือกคำตอบ
}

const QuestionPage = ({
  questionId, // รับหมายเลขคำถาม
  question, // รับคำถามและตัวเลือก
  onDelete, // ฟังก์ชันลบคำถาม
  onDuplicate, // ฟังก์ชันคัดลอกคำถาม
}: {
  questionId: number;
  question: Question;
  onDelete: () => void;
  onDuplicate: () => void;
}) => {
  const theme = useTheme(); // ใช้ hook useTheme เพื่อดึงธีม
  const {
    control,
    formState: { errors },
  } = useFormContext<formData>();
  // ใช้ hook useFormContext เพื่อเข้าถึงค่าจาก react-hook-form และใช้ errors เพื่อตรวจสอบข้อผิดพลาด
  const [choices, setChoices] = useState(question.choices); // กำหนด state สำหรับตัวเลือกคำตอบที่ได้รับจากคำถาม

  // ฟังก์ชันสำหรับเพิ่มตัวเลือกใหม่
  const handleAddChoice = () => {
    setChoices([...choices, { description: "", isAnswer: false }]); // เพิ่มตัวเลือกใหม่ที่มีคำอธิบายเป็นค่าว่างและ isAnswer เป็น false
  };

  // ฟังก์ชันสำหรับลบตัวเลือก
  const handleDeleteChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index)); // ลบตัวเลือกที่มี index ตรงกับตัวเลือกที่เลือก
  };

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`, // กำหนดสีของกรอบของกล่องจากธีม
        padding: theme.spacing(2), // กำหนดระยะห่างภายในกล่องตามธีม
        marginBottom: 2, // ระยะห่างด้านล่าง
        borderRadius: 2, // ขอบกล่องมน
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: 2, color: theme.palette.text.primary }} // ใช้สีข้อความจากธีม
      >
        Question {questionId} {/* แสดงหมายเลขคำถาม */}
      </Typography>

      {/* ใช้ Controller จาก react-hook-form สำหรับจัดการฟอร์ม */}
      <Controller
        name={`questions[${questionId - 1}].question`} // ชื่อฟิลด์ในฟอร์ม
        control={control} // ใช้ control จาก useFormContext เพื่อให้ฟอร์มรู้จักฟิลด์นี้
        defaultValue={question.question} // ค่าเริ่มต้นของคำถามจาก props
        rules={{ required: "Please fill in this option" }} // กำหนด validation ว่าต้องกรอกคำถาม
        render={({ field }) => (
          <TextField
            {...field} // spread props ที่ได้จาก field ของ react-hook-form
            label="Question*" // ใส่ label สำหรับฟิลด์
            variant="outlined" // ใช้รูปแบบป้ายกำกับ
            fullWidth // ให้ฟิลด์ขยายเต็มความกว้าง
            error={!!errors.questions?.[questionId - 1]?.question} // ถ้ามีข้อผิดพลาดในคำถามจะแสดงเป็น error
            helperText={errors.questions?.[questionId - 1]?.question?.message} // ข้อความแนะนำสำหรับข้อผิดพลาด
            sx={{
              marginBottom: 2,
            }}
          />
        )}
      />

      {/* แสดงตัวเลือก (choices) */}
      {choices.map((choice, index) => (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          key={index} // ใช้ index เป็น key สำหรับลูป
        >
          <Radio
            checkedIcon={
              <CheckCircle sx={{ color: theme.palette.success.main }} />
            }
          />
          {/* ใช้ Controller สำหรับ Description */}
          <Controller
            name={`questions[${questionId - 1}].choices[${index}].description`} // ชื่อฟิลด์สำหรับคำอธิบายตัวเลือก
            control={control} // ใช้ control จาก useFormContext
            defaultValue={choice.description} // ค่าเริ่มต้นจาก choice.description
            rules={{ required: "Please fill in this option" }}
            render={({ field }) => (
              <TextField
                {...field} // spread props ของ field
                label="Description*"
                variant="outlined"
                fullWidth
                error={
                  !!errors.questions?.[questionId - 1]?.choices?.[index]
                    ?.description
                } // ถ้ามีข้อผิดพลาดจะแสดง error
                helperText={
                  errors.questions?.[questionId - 1]?.choices?.[index]
                    ?.description?.message
                } // ข้อความแนะนำสำหรับข้อผิดพลาด
                sx={{
                  marginRight: 2,
                }}
              />
            )}
          />
          <IconButton onClick={() => handleDeleteChoice(index)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ))}

      {/* ปุ่มเพิ่มตัวเลือก */}
      <Button
        color="warning"
        sx={{
          display: "flex",
          gap: 1,
          fontFamily: theme.typography.fontFamily,
        }}
        onClick={handleAddChoice} // เรียกฟังก์ชัน handleAddChoice เมื่อคลิก
      >
        <AddIcon />
        <p>Add Choice</p>
      </Button>

      {/* ปุ่มสำหรับ Duplicate และ Delete */}
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button
          sx={{ gap: 1, color: theme.palette.text.primary }}
          onClick={onDuplicate} // เรียกฟังก์ชัน onDuplicate เมื่อคลิก
        >
          <ContentCopyIcon />
          <p>Duplicate</p>
        </Button>
        <Button
          sx={{ gap: 1, color: theme.palette.text.primary }}
          onClick={onDelete} // เรียกฟังก์ชัน onDelete เมื่อคลิก
        >
          <DeleteOutlineIcon />
          <p>Delete</p>
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPage;
