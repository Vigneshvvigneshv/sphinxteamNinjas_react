import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { Button, ButtonContainer, CommonContainer, CommonHeader, CommonHeading, CommonSection, Content } from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import Empty from '../component/Empty';
import {  Navigate, useParams } from 'react-router-dom';
import QuestionTable from '../component/QuestionTable';
import { apiDelete, apiGet } from '../ApiServices/apiServices';
import { PageNo, PaginationContainer, SelectAllContainer } from '../styles/question_style';
import { CheckBox } from '../styles/form_style';
import { toast } from 'sonner';
import Modal from '../component/Modal';

const QuestionPage = () => {
  const [data, setData] = useState({
    questionList: [],
    pageNo: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
    responseMessage: "",
    topicName: "",
    topicId: "",
  });

  
   const [selectedIds, setSelectedIds] = useState([]);
  const {id} = useParams();
     //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [show,setShow]=useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState(null);


    const fetchData = async (page, customLimit = limit) => {
      if(page<1) return;
      try {
        const response = await apiGet(`/question/getquestions-by-topic?topicId=${id}&pageNo=${page}&pageSize=${customLimit}`);
        if (!response) return;

        setData({
          questionList: response.questionList ||[],
          pageNo:response.pageNo,
          totalPages:response.totalPages,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          responseMessage:response.responseMessage,
          topicName: response.topicName,
          topicId: response.topicId,
        });
        setCurrentPage(response.pageNo);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
 
    useEffect(() => {
        if (limit) fetchData(1, limit);
    }, [id, limit]);



   const SelectedQuestions = (e,questionId) => {
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


//handle Bulkdelete
const handleBulkDelete = async () => {
  if (selectedIds.length === 0) {
    console.log("selectedIds ",selectedIds )
     toast.error(`Please select the question to delete`,{position:'top-center',color:'red'})
    return;
  }
  setShow(true);
};


const cancelBulkDelete = () => {
  setShow(false); 
};

const cancelDelete=()=>{
  setShowDeleteModal(false);
}
//confirm Delete
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
//singleDelete
 const handleDelete=(q)=>{
    console.log("delete",q) 
    setDeleteQuestion(q);
    setShowDeleteModal(true);
  }

//single Delete
 const handleConfirmDelete = async () => {
    try {
      // const isToDelete=[data.questionId];

      if(!deleteQuestion){
        return;
      }

      console.log("Confirm Delete ",deleteQuestion.questionId)
      const response = await apiDelete('/question/delete-question', { "questionIds": [deleteQuestion.questionId] });
      console.log(response);
      toast.success("Question deleted successfully", { position: "top-center" });

      setShowDeleteModal(false);
      setDeleteQuestion(null);

      await fetchData(currentPage); 
    } catch (error) {
      console.error(error);  
    }
  }

 

  // console.log('Question Page', data);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <SelectAllContainer>
          <CheckBox
                type="checkbox"
                checked={
                  data.questionList.length > 0 &&
                  data.questionList.every((item) => selectedIds.includes(Number(item.questionId)))
                }
                onChange={handleSelectAll}/>
                 
          <CommonHeading>{data.topicName}</CommonHeading>
          </SelectAllContainer>
          <Content>Question type</Content>
          {console.log("Topic Name inside question page",data.topicId)}
          <ButtonContainer>
            <NavButton to="/createquestion" state={{topicId: data.topicId, topicName: data.topicName}}>
              Add question
            </NavButton>
            <NavButton onClick={handleBulkDelete} disabled={selectedIds.length === 0}>Bulk Delete</NavButton>
            
          </ButtonContainer>
        </CommonHeader>

         {show && (
                   <Modal 
                        title="Confirm Bulk Delete" 
                        showConfirmButton={true} 
                        onConfirm={confirmDelete} 
                        onCancel={cancelBulkDelete}
                      >
                        Are you sure you want to delete {selectedIds.length} selected question{selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.
                  </Modal>
                    )}

        {showDeleteModal && (
        <Modal 
          title="Confirm Delete" 
          showConfirmButton={true} 
          onConfirm={handleConfirmDelete} 
          onCancel={cancelDelete}
        >
          Are you sure you want to delete this question? This action cannot be undone.
        </Modal>
      )}                    
        <CommonSection>
          {(data.responseMessage === 'SUCCESS' && data.questionList.length > 0)
            ? data.questionList.map((e) => <QuestionTable handleDelete={handleDelete} data={e} name={data.topicName} key={e.questionId} selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                change={SelectedQuestions}/>)
            : <Empty>No question available</Empty>
          }
        </CommonSection>
        {data.questionList.length > 0 && (
          <PaginationContainer >
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
                fetchData(currentPage+ 1);
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
          </PaginationContainer>
        )}
      </CommonContainer>
    </Layout>
  )
}

export default QuestionPage
