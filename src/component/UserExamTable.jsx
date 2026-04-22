import { useState } from "react";
import {
  ButtonContainer,
  Content,
  TableRow,
  ExamContainer,
  ContentHeading,
  ExamContent,
  AddButton,
  ExamHeader,
  DeleteButton,
  StartButton,
} from "../styles/common_style";
import { Button } from "flowbite-react";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import BackDrop from "./BackDrop";
import { FileInput } from "../styles/form_style";
import { FaX } from "react-icons/fa6";
import { NavButton  } from "../styles/header_style";

export const UserExamTable = ({ data, handleStartExam }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>
          <Button
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}

            {show ? "Hide" : "View details"}
          </Button>
          <StartButton
            onClick={() => {
              handleStartExam(data.examId);
            }}
          >
            Start
            <FaArrowAltCircleRight />
          </StartButton>
        </ButtonContainer>
      </TableRow>
      {show && (
        <ExamContainer style={{ display: "block" }}>
          <ContentHeading>
            Description:
            <ExamContent>{data.description}</ExamContent>
          </ContentHeading>
          <ContentHeading>
            Duration:<ExamContent>{data.duration} min</ExamContent>
          </ContentHeading>
          <ContentHeading>
            Total Questions:
            <ExamContent>{data.noOfQuestions}</ExamContent>
          </ContentHeading>
          <ContentHeading>
            Attempt count:
            <ExamContent>{data.noOfAttempts}</ExamContent>
          </ContentHeading>
          <ContentHeading>
            No of Attempts left:
            <ExamContent>{data.allowedAttempts-data.noOfAttempts}</ExamContent>
          </ContentHeading>
        </ExamContainer>
      )}
    </>
  );
};
