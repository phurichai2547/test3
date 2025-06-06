import { Box, Button, TextField, Typography, IconButton, Radio } from "@mui/material"; 
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; 
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; 
import CheckCircle from "@mui/icons-material/CheckCircle"; 
import AddIcon from "@mui/icons-material/Add"; 
import { useTheme } from "@mui/material/styles"; 
import { Controller, useFormContext, useFieldArray } from "react-hook-form"; 
import React, { useEffect } from "react";

// ประกาศ type ของตัวเลือกแต่ละตัว (Choice)
interface Choice {
  id: number; // id ที่ใช้สำหรับระบุตัวเลือก
  description: string; // คำอธิบายของตัวเลือก
  isAnswer: boolean; // ค่าบอกว่าตัวเลือกนี้เป็นคำตอบที่ถูกต้องหรือไม่
}

// ประกาศ type ของคำถามแต่ละข้อ (Question)
interface Question {
  question: string; // คำถาม
  choices: Choice[]; // รายการของตัวเลือกคำตอบ
}

// โครงสร้างข้อมูลของฟอร์มทั้งหมด (formData)
interface formData {
  questionnaireDetail: string; // ชื่อฟอร์ม
  questions: Question[]; // รายการคำถามทั้งหมด
}

const QuestionPage = ({
  questionId,
  question,
  onDelete,
  onDuplicate,
}: {
  questionId: number;
  question: Question;
  onDelete: () => void;
  onDuplicate: () => void;
}) => {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<formData>(); // ดึง context จาก react-hook-form มาใช้งาน

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionId - 1}.choices`, // ผูกกับชื่อของฟิลด์ใน react-hook-form
  });

  // ฟังก์ชันสำหรับเพิ่มตัวเลือกใหม่
  const handleAddChoice = () => {
    append({ description: "", isAnswer: false, id: Date.now() }); // ใช้ append เพื่อเพิ่ม choice ใหม่
  };

  // ฟังก์ชันลบตัวเลือกที่มี id ตรงกับที่กด
  const handleDeleteChoice = (id: number) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index !== -1) {
      remove(index); // ลบ choice ที่มี id ตรง
      // ถ้าลบข้อสุดท้ายให้กลับมาตั้งค่าตัวเลือกแรก
      if (fields.length === 1) {
        setDefaultAnswer(); // กลับไปที่ตัวเลือกแรก
      }
    }
  };

  // เลือกคำตอบที่ถูกต้องเพียงตัวเดียว
  const handleChoiceChange = (id: number) => {
    const updatedChoices = fields.map((choice) => ({
      ...choice,
      isAnswer: choice.id === id, // เปลี่ยนตัวเลือกที่มี `id` ตรง
    }));
    updatedChoices.forEach((choice, index) => {
      setValue(`questions.${questionId - 1}.choices.${index}`, choice); // ซิงค์กับ react-hook-form
    });
  };

  // ฟังก์ชันตั้งค่า default ให้ตัวเลือกแรกเป็น isAnswer: true
  const setDefaultAnswer = () => {
    const updatedChoices = fields.map((choice, index) => ({
      ...choice,
      isAnswer: index === 0, // ตัวเลือกแรกจะถูกตั้งให้เป็น true โดยอัตโนมัติ
    }));

    updatedChoices.forEach((choice, index) => {
      setValue(`questions.${questionId - 1}.choices.${index}`, choice); // ซิงค์กับ react-hook-form
    });
  };

  // เมื่อคำถามโหลดขึ้นมาจะตั้งค่าตัวเลือกแรกเป็น isAnswer: true
  useEffect(() => {
    // ตรวจสอบว่า fields ว่างหรือไม่
    if (fields.length === 0) {
      // เพิ่มตัวเลือกแรกที่มี isAnswer: true ทันที
      append({ description: "", isAnswer: true, id: Date.now() });
    } else {
      // ตั้งค่าตัวเลือกแรกเป็นคำตอบที่ถูกต้อง
      setDefaultAnswer();
    }
  }, [fields, append, setValue, questionId]);

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
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

      {/* ช่องกรอกคำถาม */}
      <Controller
        name={`questions.${questionId - 1}.question`}
        control={control}
        defaultValue={question.question}
        rules={{ required: "Please fill in this option" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Question*"
            variant="outlined"
            fullWidth
            error={!!errors.questions?.[questionId - 1]?.question}
            helperText={errors.questions?.[questionId - 1]?.question?.message}
            sx={{ marginBottom: 2 }}
          />
        )}
      />

      {/* แสดงตัวเลือกแต่ละข้อ */}
      {fields.map((choice, index) => (
        <Box
          key={choice.id}
          sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
        >
          <Radio
            checked={choice.isAnswer} // ตัวเลือกแรกถูกติ๊กโดยอัตโนมัติ
            onChange={() => handleChoiceChange(choice.id)} // เมื่อเลือก radio ตัวนี้
            checkedIcon={
              <CheckCircle sx={{ color: theme.palette.success.main }} />
            }
          />
          <Box sx={{ flexGrow: 1 }}>
            <Controller
              name={`questions.${questionId - 1}.choices.${index}.description`}
              control={control}
              defaultValue={choice.description}
              rules={{ required: "Please fill in this option" }}
              render={({ field }) => {
                const isAnswer = choice.isAnswer;
                const fieldError =
                  errors.questions?.[questionId - 1]?.choices?.[index]
                    ?.description;

                return (
                  <TextField
                    {...field}
                    label="Description*"
                    variant="outlined"
                    fullWidth
                    error={!isAnswer && !!fieldError}
                    helperText={
                      isAnswer
                        ? "This answer is correct"
                        : fieldError?.message || ""
                    }
                    sx={{ marginRight: 2 }}
                  />
                );
              }}
            />
          </Box>

          {/* ปุ่มลบตัวเลือก */}
          <IconButton onClick={() => handleDeleteChoice(choice.id)}>
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
        onClick={handleAddChoice}
      >
        <AddIcon />
        <p>Add Choice</p>
      </Button>

      {/* ปุ่ม duplicate และ delete คำถาม */}
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button
          sx={{ gap: 1, color: theme.palette.text.primary }}
          onClick={onDuplicate}
        >
          <ContentCopyIcon />
          <p>Duplicate</p>
        </Button>
        <Button
          sx={{ gap: 1, color: theme.palette.text.primary }}
          onClick={onDelete}
        >
          <DeleteOutlineIcon />
          <p>Delete</p>
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPage;
