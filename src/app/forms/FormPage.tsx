"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"; // import useForm, FormProvider และ SubmitHandler จาก react-hook-form
import QuestionPage from "./QuestionPage";
import Navbar from "../Navbar/Navbar";

// กำหนด interface สำหรับ Choice (ตัวเลือกคำตอบ)
interface Choice {
  description: string; // คำอธิบายของตัวเลือก
  isAnswer: boolean; // ใช้บอกว่าเป็นคำตอบที่ถูกต้องหรือไม่
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
        },
      ],
    },
  ],
};

const FormPage = () => {
  const methods = useForm<formData>({
    // สร้าง instance ของ useForm
    defaultValues: initialState, // กำหนดค่าเริ่มต้นของฟอร์ม
    mode: "onSubmit", // ใช้โหมดการตรวจสอบค่าภายในฟอร์มเมื่อส่ง
  });

  // ฟังก์ชันสำหรับเพิ่มคำถามใหม่
  const handleAddQuestion = () => {
    methods.setValue("questions", [
      // ใช้ setValue เพื่ออัปเดตค่าในฟอร์ม
      ...methods.getValues("questions"), // ดึงค่าของคำถามทั้งหมด
      { question: "", choices: [{ description: "", isAnswer: false }] }, // เพิ่มคำถามใหม่
    ]);
  };

  // ฟังก์ชันที่เรียกเมื่อคลิกปุ่ม Save
  const handleSave: SubmitHandler<formData> = (data) => {
    console.log(data); // แสดงข้อมูลทั้งหมดที่กรอกในฟอร์ม
  };

  return (
    <FormProvider {...methods}>
      {" "}
      {/* ห่อหุ้มฟอร์มทั้งหมดด้วย FormProvider */}
      <Box sx={{ padding: 1 }}>
        <Navbar onSave={methods.handleSubmit(handleSave)} />{" "}
        {/* เรียก Navbar และส่ง onSave */}
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Questionnaire Detail
        </Typography>
        <TextField
          label="Name*"
          variant="outlined"
          fullWidth
          {...methods.register("questionnaireDetail", {
            // ใช้ register เพื่อลงทะเบียนฟิลด์ใน react-hook-form
            required: "Please fill in this option", // กำหนดว่าเป็นฟิลด์ที่ต้องกรอก
          })}
          error={!!methods.formState.errors.questionnaireDetail} // เช็คว่ามีข้อผิดพลาดหรือไม่
          helperText={methods.formState.errors.questionnaireDetail?.message} // แสดงข้อความข้อผิดพลาด
          sx={{ marginBottom: 3 }}
        />
        {/* แสดงคำถามที่กรอกแล้ว */}
        {methods.watch("questions").map((question, index) => (
          <QuestionPage
            key={index} // ใช้ index เพื่อเป็น key ของแต่ละคำถาม
            questionId={index + 1} // หมายเลขคำถาม
            question={question} // คำถามที่ส่งมา
            onDelete={() =>
              // ฟังก์ชันลบคำถาม
              methods.setValue(
                "questions",
                methods.getValues("questions").filter((_, i) => i !== index) // ลบคำถามที่เลือก
              )
            }
            onDuplicate={() => {
              // ฟังก์ชันสำหรับคัดลอกคำถามใต้ add choice
              const questions = methods.getValues("questions"); // ดึงข้อมูลจากคำถามทั้งหมด
              methods.setValue("questions", [
                ...questions,
                { ...questions[index] }, // คัดลอกคำถามที่เลือก
              ]);
            }}
          />
        ))}
        {/* ปุ่ม Add Question */}
        <Button
          onClick={handleAddQuestion} // เมื่อคลิกจะเรียกฟังก์ชัน handleAddQuestion
          variant="outlined"
          fullWidth // ทำให้ปุ่มเต็มในแนวกว้าง
          sx={{ marginTop: 2 }}
        >
          Add Question
        </Button>
      </Box>
    </FormProvider>
  );
};

export default FormPage;
