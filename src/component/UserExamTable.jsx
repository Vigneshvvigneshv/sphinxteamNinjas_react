import { useState } from "react";
import { ButtonContainer, Content, TableRow,ExamContainer, ContentHeading, ExamContent, AddButton } from "../styles/common_style";
import { Button } from "flowbite-react";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaArrowAltCircleRight } from "react-icons/fa";

export const UserExamTable=({data})=>{

      const [show, setShow] = useState(false);
    return(
        <>
        <TableRow>
           <Content>{data.examName}</Content>
                      <ButtonContainer>
                        <Button onClick={()=>{setShow(!show);}}>
                          {show ? <FaAngleDoubleUp/> : <FaAngleDoubleDown />}

                          {show ? "Hide" : "View details"}
                        </Button>
                        <AddButton>Start<FaArrowAltCircleRight/></AddButton>
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
                      </ExamContainer>
                    )}
        </>
    )   
}