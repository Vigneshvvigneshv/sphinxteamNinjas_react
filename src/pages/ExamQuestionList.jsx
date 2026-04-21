
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../component/Layout'
import { apiGet, apiPost } from '../ApiServices/apiServices'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, ButtonContainer, Container, OptionBox, Question, SubmitButtonTop, Timer, TopBar, MainContent, QuestionNumber, OptionsGrid, RightControls, FreeTextInput, FreeTextArea } from '../styles/ExamQuestionList_style'

import Modal from '../component/Modal'

const ExamQuestionList = () => {
    const {examId}=useParams();
    const{partyId}=useParams();
  const [data, setData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [examName, setExamName] = useState("");
  const [showSubmitModal,setShowSubmitModal]=useState(false);
  const timerRef = useRef(null);

  const navigate= useNavigate();
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

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const response = await apiGet(`/exam/getexam/${examId}`);
                if (response?.examList) {
                    if (response.examList.duration) {
                        setTimeLeft(response.examList.duration * 60);
                        setTimerStarted(true);
                    }
                    if (response.examList.examName) {
                        setExamName(response.examList.examName);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchExamDetails();
    }, [examId]);

     // ---------- Timer ----------
  useEffect(() => {
    if (!timerStarted) return;

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
  }, [timerStarted]);


   const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const saveAnswer=async(questionId,answer)=>{
     try {
      await apiPost("/answer/save-answer", {
        examId:examId,
        partyId:partyId,
       questionId: questionId,
       answer: answer,
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

  const handleMultiChoiceChange = (option, checked) => {
    const qId = data.question.questionId;
    setAnswers((prev) => {
      let currentAnswers = Array.isArray(prev[qId]) ? [...prev[qId]] : [];
      if (checked) {
         currentAnswers.push(option);
      } else {
         currentAnswers = currentAnswers.filter(ans => ans !== option);
      }
      return {
        ...prev,
        [qId]: currentAnswers
      };
    });
  };

  const handleTextChange = (text) => {
    const qId = data.question.questionId;
    setAnswers((prev) => ({
      ...prev,
      [qId]: text,
    }));
  };

    // ---------- Navigation ----------
  const handleNext = async () => {
    const qId = data.question.questionId;
    const selected = answers[qId];

    if (selected !== undefined) {
      const formattedAnswer = Array.isArray(selected) ? selected.join(",") : selected;
      await saveAnswer(qId, formattedAnswer);
    }

    if (data.hasNext){
         setPageNo((p) => p + 1);
    }
  };

  const handlePrevious = async () => {
    const qId = data.question.questionId;
    const selected = answers[qId];

    if (selected !== undefined) {
      const formattedAnswer = Array.isArray(selected) ? selected.join(",") : selected;
      await saveAnswer(qId, formattedAnswer);
    }

    if (data.hasPrevious){ 
        setPageNo((p) => p - 1);
    }
  };

  // ---------- Final Submit ----------
  const handleFinalSubmit = async () => {
    
     const response= await apiPost("/submit-exam/submit-exam", {
        examId:examId,
        partyId:partyId,
      });

      if(response.responseMessage=="SUCCESS"){
        setShowSubmitModal(false);
        navigate(`/exam-result/${examId}/${partyId}`);
      }
      if(response.responseMessage=="ERROR"){
        setShowSubmitModal(false);

        toast.error("Error submitting exam",{position:"top-center"})
      }
  };
  if (!data) return <p>Loading...</p>;

  const q = data.question; 
  return (
    <Layout>
        <Container>
        <TopBar>
            <h3>{examName || "Loading..."}</h3>
            <RightControls>
                <Timer>⏱ {timeLeft !== null ? formatTime(timeLeft) : 'Loading...'}</Timer>
                <SubmitButtonTop onClick={()=>{setShowSubmitModal(!showSubmitModal)}}>
                  Submit Exam
                </SubmitButtonTop>
            </RightControls>
        </TopBar>
        
        <MainContent>
            <QuestionNumber>Question {pageNo}</QuestionNumber>
            <Question>{q.questionDetail}</Question>
            
            {(!q.questionTypeId || q.questionTypeId === 'SINGLE_CHOICE' || q.questionTypeId === 'TRUE_FALSE') && (
            <OptionsGrid>
             {["A", "B", "C", "D"].map((opt) => {
                const optText = q[`option${opt}`];
                if (!optText) return null;
                return (
                <OptionBox
                  key={opt}
                  selected={answers[q.questionId] === opt}
                >
                  <input
                    type="radio"
                    checked={answers[q.questionId] === opt}
                    onChange={() => handleOptionChange(opt)}
                  />
                  <span>{optText}</span>
                </OptionBox>
                );
             })}
            </OptionsGrid>
            )}

            {q.questionTypeId === 'MULTI_CHOICE' && (
            <OptionsGrid>
             {["A", "B", "C", "D"].map((opt) => {
                const optText = q[`option${opt}`];
                if (!optText) return null;
                const isChecked = Array.isArray(answers[q.questionId]) && answers[q.questionId].includes(opt);
                return (
                <OptionBox
                  key={opt}
                  selected={isChecked}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleMultiChoiceChange(opt, e.target.checked)}
                  />
                  <span>{optText}</span>
                </OptionBox>
                );
             })}
            </OptionsGrid>
            )}

            {q.questionTypeId === 'FILL_BLANKS' && (
               <FreeTextInput 
                  type="text" 
                  placeholder="Type your answer here..."
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
               />
            )}

            {q.questionTypeId === 'DETAILED_ANSWER' && (
               <FreeTextArea 
                  placeholder="Type your detailed answer here..."
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
               />
            )}
        </MainContent>

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
