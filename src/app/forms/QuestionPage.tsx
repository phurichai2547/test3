"use client";

import { Box, Button, TextField, Typography, IconButton, Radio } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { Controller, useFormContext, useFieldArray } from "react-hook-form"; // ใช้ useFieldArray สำหรับการอัปเดต choices

// ประกาศ type ของตัวเลือกแต่ละตัว
interface Choice {
  id: number; // เพิ่ม id สำหรับ choice
  description: string;
  isAnswer: boolean;
}

// ประกาศ type ของคำถามแต่ละข้อ
interface Question {
  question: string;
  choices: Choice[]; // รายการของตัวเลือกคำตอบ
}

// โครงสร้างข้อมูลของทั้งแบบสอบถาม
interface formData {
  questionnaireDetail: string;
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

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        marginBottom: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, color: theme.palette.text.primary }}>
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
        <Box key={choice.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Radio
            checked={choice.isAnswer}
            onChange={() => handleChoiceChange(choice.id)} // เมื่อเลือก radio ตัวนี้
            checkedIcon={<CheckCircle sx={{ color: theme.palette.success.main }} />}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Controller
              name={`questions.${questionId - 1}.choices.${index}.description`}
              control={control}
              defaultValue={choice.description}
              rules={{ required: "Please fill in this option" }}
              render={({ field }) => {
                const isAnswer = choice.isAnswer;
                const fieldError = errors.questions?.[questionId - 1]?.choices?.[index]?.description;

                return (
                  <TextField
                    {...field}
                    label="Description*"
                    variant="outlined"
                    fullWidth
                    error={!isAnswer && !!fieldError}
                    helperText={isAnswer ? "This answer is correct" : fieldError?.message || ""}
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
        <Button sx={{ gap: 1, color: theme.palette.text.primary }} onClick={onDuplicate}>
          <ContentCopyIcon />
          <p>Duplicate</p>
        </Button>
        <Button sx={{ gap: 1, color: theme.palette.text.primary }} onClick={onDelete}>
          <DeleteOutlineIcon />
          <p>Delete</p>
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPage;
