import React from "react";
import { Card, ExamContent, ExamHeader } from "../styles/common_style";

const ExamCard = ({ data }) => {
  {
    console.log(data);
  }
  return (
    <>
      <Card>
        <ExamHeader>
          Exam name :<ExamContent>{data.examName}</ExamContent>{" "}
        </ExamHeader>
        <ExamHeader>
          No of questions :<ExamContent>{data.noOfQuestions}</ExamContent>{" "}
        </ExamHeader>
        <ExamHeader>
          Duration :<ExamContent>{data.duration}</ExamContent>{" "}
        </ExamHeader>
      </Card>
    </>
  );
};

export default ExamCard;
