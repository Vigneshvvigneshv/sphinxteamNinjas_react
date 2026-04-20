
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../component/Layout'
import { apiGet, apiPost } from '../ApiServices/apiServices'
import { useParams } from 'react-router-dom'
import { CommonContainer } from '../styles/common_style'
import { Button, ButtonContainer, Container, OptionBox, Question, SubmitButtonTop, Timer, TopBar } from '../styles/ExamQuestionList_style'
import { toast } from 'sonner'
import Modal from '../component/Modal'

const ExamQuestionList = () => {
    const {examId}=useParams();
    const{partyId}=useParams();
  const [data, setData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [showSubmitModal,setShowSubmitModal]=useState(false);
  const timerRef = useRef(null);

  //fetching questions
    const fecthQuestion=async(page)=>{
        try{
            const response= await apiGet(`/exam-question/get-exam-questions?examId=${examId}&pageNo=${page}`);
              {console.log("response",response)}
              setData(response);
        }catch(error){
            console.error(error);
        }
      }
    
    useEffect(()=>{
        fecthQuestion(pageNo);
    },[pageNo])


     // ---------- Timer ----------
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit(); // auto submit
        }
        return prev - 1;
      });
    }, 1000);


    
 return () => clearInterval(timerRef.current);
  }, []);


   const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const saveAnswer=async(questionId,answer)=>{
     try {
      await apiPost("/answer/save-answer", {
        examId:examId,
        partyId,
        questionId,
        answer,
      });
    } catch (err) {
      console.error("Save failed", err);
    }
  }

   // ---------- Option Select ----------
  const handleOptionChange = (option) => {
    const qId = data.question.questionId;

    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

    // ---------- Navigation ----------
  const handleNext = async () => {
    const qId = data.question.questionId;
    const selected = answers[qId];

    if (selected) {
      await saveAnswer(qId, selected);
    }

    if (data.hasNext){
         setPageNo((p) => p + 1);
    }
  };

  const handlePrevious = async () => {
    const qId = data.question.questionId;
    const selected = answers[qId];

    if (selected) {
      await saveAnswer(qId, selected);
    }

    if (data.hasPrevious){ 
        setPageNo((p) => p - 1);
    }
  };

  // ---------- Final Submit ----------
  const handleFinalSubmit = async () => {
    try {
      await apiPost("/submit-exam/submit-exam", {
        examId:examId,
        partyId:partyId,
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!data) return <p>Loading...</p>;

  const q = data.question; 
  return (
    <Layout>
        <Container>
        <TopBar>
            <Timer>⏱ {formatTime(timeLeft)}</Timer>
            <SubmitButtonTop onClick={()=>{setShowSubmitModal(!showSubmitModal)}}>
          Submit Exam
        </SubmitButtonTop>
        </TopBar>
        
        <Question>{q.questionDetail}</Question>

         {["A", "B", "C", "D"].map((opt) => (
        <OptionBox
          key={opt}
          selected={answers[q.questionId] === opt}
        >
          <input
            type="radio"
            checked={answers[q.questionId] === opt}
            onChange={() => handleOptionChange(opt)}
          />
          {opt === "A" && q.optionA}
          {opt === "B" && q.optionB}
          {opt === "C" && q.optionC}
          {opt === "D" && q.optionD}
        </OptionBox>
      ))}

       {/* Navigation */}
      <ButtonContainer>
        <Button onClick={handlePrevious} disabled={!data.hasPrevious}>
          Previous
        </Button>

        <Button primary onClick={handleNext} disabled={!data.hasNext}>
          Next
        </Button>
      </ButtonContainer>
        </Container>

        {showSubmitModal && (
        <Modal
          title="Confirm Submit"
          onConfirm={handleFinalSubmit}
          onCancel={() => setShowSubmitModal(!showSubmitModal)}
          showConfirmButton={true}
        >
      Are you sure you want to submit the exam?
        </Modal>
      )}
    </Layout>
  )
}

export default ExamQuestionList
