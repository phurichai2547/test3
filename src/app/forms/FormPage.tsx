"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"; // import useForm, FormProvider และ SubmitHandler จาก react-hook-form
import QuestionPage from "./QuestionPage";
import Navbar from "../Navbar/Navbar";

// กำหนด interface สำหรับ Choice (ตัวเลือกคำตอบ)
interface Choice {
  description: string; // คำอธิบายของตัวเลือก
  isAnswer: boolean; // ใช้บอกว่าเป็นคำตอบที่ถูกต้องหรือไม่
  id: number; // id ที่ต้องมีใน Choice
}

// กำหนด interface สำหรับ Question (คำถาม)
interface Question {
  question: string; // คำถาม
  choices: Choice[]; // รายการของตัวเลือกคำตอบ
}

// กำหนด interface สำหรับ formData ที่เก็บข้อมูลของฟอร์มทั้งหมด
interface formData {
  questionnaireDetail: string; // ชื่อฟอร์ม
  questions: Question[]; // คำถามทั้งหมด
}

// กำหนดค่าเริ่มต้นของฟอร์ม
const initialState: formData = {
  questionnaireDetail: "", // ค่าเริ่มต้นของชื่อฟอร์ม
  questions: [
    {
      question: "", // ค่าเริ่มต้นของคำถาม
      choices: [
        {
          description: "", // ค่าเริ่มต้นของตัวเลือกคำตอบ
          isAnswer: false, // ค่าเริ่มต้นของตัวเลือกคำตอบที่ถูกต้อง
          id: Date.now(), // สร้าง id ใหม่ทุกครั้ง
        },
      ],
    },
  ],
};

const FormPage = () => {
  // ประกาศ methods โดยใช้ useForm จาก react-hook-form
  const methods = useForm<formData>({
    defaultValues: initialState, // กำหนดค่าเริ่มต้นของฟอร์ม
    mode: "onSubmit", // ใช้โหมดการตรวจสอบค่าภายในฟอร์มเมื่อส่ง
  });

  // ฟังก์ชันสำหรับเพิ่มคำถามใหม่
  const handleAddQuestion = () => {
    methods.setValue("questions", [
      ...methods.getValues("questions"), // ดึงค่าของคำถามทั้งหมด
      {
        question: "",
        choices: [
          {
            description: "",
            isAnswer: false,
            id: Date.now(), // เพิ่ม id ใหม่ทุกครั้งที่เพิ่มคำถาม
          },
        ],
      },
    ]);
  };

  // ฟังก์ชันที่เรียกเมื่อคลิกปุ่ม Save
  const handleSave: SubmitHandler<formData> = (data) => {
    console.log(data); // แสดงข้อมูลทั้งหมดที่กรอกในฟอร์ม
  };

  return (
    <FormProvider {...methods}>
      <Navbar onSave={methods.handleSubmit(handleSave)} />
      <Box sx={{ padding: 1 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Questionnaire Detail
        </Typography>
        <TextField
          label="Name*"
          variant="outlined"
          fullWidth
          {...methods.register("questionnaireDetail", {
            required: "Please fill in this option",
          })}
          error={!!methods.formState.errors.questionnaireDetail}
          helperText={methods.formState.errors.questionnaireDetail?.message}
          sx={{ marginBottom: 3 }}
        />
        {methods.watch("questions").map((question, index) => (
          <QuestionPage
            key={index}
            questionId={index + 1}
            question={question}
            onDelete={() =>
              methods.setValue(
                "questions",
                methods.getValues("questions").filter((_, i) => i !== index)
              )
            }
            onDuplicate={() => {
              const questions = methods.getValues("questions");
              methods.setValue("questions", [
                ...questions,
                { ...questions[index] },
              ]);
            }}
          />
        ))}
        <Button
          onClick={handleAddQuestion}
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Add Question
        </Button>
      </Box>
    </FormProvider>
  );
};

export default FormPage;
