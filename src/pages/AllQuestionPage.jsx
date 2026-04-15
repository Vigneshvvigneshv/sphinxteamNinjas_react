import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AddButton,
  ButtonContainer,
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  Content,
  DeleteButton,
} from "../styles/common_style";
import { NavButton } from "../styles/header_style";
import Empty from "../component/Empty";
import { apiDelete, apiGet } from "../ApiServices/apiServices";

import AllQuestionsTable from "../component/AllQuestionsTable";
import { toast } from "sonner";
import { CheckBox } from "../styles/form_style";
import { PageNo, PaginationContainer, SelectAllContainer } from "../styles/question_style";
import Modal from "../component/Modal";
import { FaAd, FaPlus, FaTrash } from "react-icons/fa";

const AllQuestionPage = () => {
  const [data, setData] = useState({
    questionList: [],
    pageNo: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
    responseMessage: "",  
  });
  const [selectedIds, setSelectedIds] = useState([]);
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [show,setShow]=useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState(null);
    const[showDeleteModal,setShowDeleteModal]=useState(false);
  
    //fetch all questions
    const fetchData = async (page, customLimit = limit) => {
       if (page < 1) return;  
      console.log("Fetching page:", page);
      const response = await apiGet( `/question/getall-questions?pageNo=${page}&pageSize=${customLimit}`);
      console.log("response", response);
      
      setData({
        questionList: response.questionList || [],
        pageNo: response.pageNo,
        totalPages: response.totalPages,
        hasNext: response.hasNext,
        hasPrevious: response.hasPrevious,
        responseMessage: response.responseMessage,   
      });
    
      setCurrentPage(response.pageNo);
    };
   

useEffect(() => {
    if (limit) fetchData(1, limit);
  }, [limit]);


//bulk delete
const handleBulkDelete = async () => {
  if (selectedIds.length === 0) {
     toast.warning(`Please select the question to delete`,{position:'top-center'})
    return;
  }
  setShow(true);
};

const cancelDelete = () => {
  setShow(false);
};
//Confirm Delete
const confirmDelete = async () => {
  try {
    await apiDelete("/question/delete-question", {
      questionIds: selectedIds,
    });

    toast.success("Deleted successfully", {
      position: "top-center",
    });
    setSelectedIds([]);
    setShow(false); 
    await fetchData(currentPage);
  } catch (error) {
    console.error(error);
  }
};

//Single Delete
const handleSingleDelete = (questionId) => {
  setDeleteQuestion(questionId);
  setShowDeleteModal(true);
};

const cancelSingleDelete = () => {
  setShowDeleteModal(false);
};

//Single deleteQuestion
const handleSingleDeleteQuestion = async () => {
  if(!deleteQuestion){
    return;
  }
  try {
    await apiDelete("/question/delete-question", {
      questionIds: [deleteQuestion.questionId],
    });

    toast.success("Deleted successfully", {
      position: "top-center",
    });

    setSelectedIds([]);
    setShowDeleteModal(false); 
    await fetchData(currentPage);
  } catch (error) {
    console.error(error);
  }
};

  const selectedQuestions = (e,questionId) => {
    {console.log("e , ",e)}
    const { checked } = e.target;
  const id = Number(questionId); 
  setSelectedIds((prev) => {
    if (checked) { 
      return prev.includes(id) ? prev : [...prev, id];
    } else {
      return prev.filter((item) => item !== id);
    }
  });
};
 {console.log("selectedIds ",selectedIds)}


//selectAll function
const handleSelectAll = (e) => {
  const { checked } = e.target;

  const allIds = data.questionList.map((item) =>
    Number(item.questionId)
  );

  if (checked) {
    setSelectedIds((prev) => [...new Set([...prev, ...allIds])]);
  } else {
    setSelectedIds((prev) =>
      prev.filter((id) => !allIds.includes(id))
    );
  }
};



  return (
    <Layout>
          <ButtonContainer>
            <AddButton style={{fontSize:"16px"}}
              to="/createquestion"
              state={{ topicId: data.topicId, topicName: data.topicName }}
            >
              <FaPlus></FaPlus>Add
            </AddButton>
           <DeleteButton onClick={handleBulkDelete} disabled={selectedIds.length === 0} >Delete all</DeleteButton>

          </ButtonContainer>
      <CommonContainer>
        <CommonHeader>
          <SelectAllContainer>
           <CheckBox
             type="checkbox"
            checked={
            data.questionList.length > 0 &&
            data.questionList.every((q) =>
            selectedIds.includes(Number(q.questionId))
            )
              }
           onChange={handleSelectAll}
          />
          <CommonHeading>Questions</CommonHeading>
          </SelectAllContainer>
          <Content>Topic</Content>
          <Content>QuestionType</Content>
          <Content></Content>
        </CommonHeader>
        <CommonSection>
          {/* {console.log("Data", data.questionList)}
          {console.log("TopicName", data.questionList)} */}

          {data.responseMessage === "success" &&
          data.questionList.length > 0 ? (
            data.questionList.map((e) => (
              <AllQuestionsTable
                handleSingleDelete={handleSingleDelete}
                data={e}
                name={e.topicName}
                key={e.questionId}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                change={selectedQuestions}/>

            ))
          ) : (
            <Empty>No question available</Empty>
          )}
        </CommonSection>


  {data.questionList.length > 0 && <PaginationContainer >
 {data.hasPrevious && <NavButton
    onClick={() => fetchData(currentPage - 1)}
    disabled={!data.hasPrevious}>
    Prev
  </NavButton>}

  <PageNo>
     {data.pageNo} / {data.totalPages}
  </PageNo>

  {data.hasNext&&<NavButton
     onClick={() => {
       if (data.pageNo < data.totalPages) {
         fetchData(currentPage + 1);
        }
      }}
      disabled={!data.hasNext} 
      >
    Next
  </NavButton>}

    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px" }}>
      <span style={{ fontSize: "14px", fontWeight: "500", whiteSpace: "nowrap" }}>Items per page:</span>
      <input 
        type="number"
        min="1"
        value={limit} 
        onChange={(e) => {
          const val = e.target.value;
          setLimit(val === '' ? '' : (val));
        }}
        onBlur={() => {
          if (!limit || limit < 1) setLimit(10);
        }}
        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc", width: "60px" }}
        />
    </div>
</PaginationContainer>}
      </CommonContainer>
      {show && (
        <Modal 
          type="delete"
          title="Confirm Bulk Delete" 
          showConfirmButton={true} 
          onConfirm={confirmDelete} 
          onCancel={cancelDelete}
        >
          Are you sure you want to delete {selectedIds.length} selected question{selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.
        </Modal>
      )}

      {showDeleteModal && (
        <Modal 
          type="delete"
          title="Confirm Delete" 
          showConfirmButton={true} 
          onConfirm={handleSingleDeleteQuestion} 
          onCancel={cancelSingleDelete}
        >
          Are you sure you want to delete this question? This action cannot be undone.
        </Modal>
      )}
    </Layout>
  );
};

export default AllQuestionPage;
