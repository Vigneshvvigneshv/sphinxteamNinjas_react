import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, ButtonContainer, CommonContainer, CommonHeader, CommonHeading, CommonSection, Content } from "../styles/common_style";
import Layout from "../component/Layout";
import { ErrorMessage, FileInput, FormContainer, SuccessMessage } from "../styles/form_style";
import { apiFilePost, apiPost } from "../ApiServices/apiServices";
import Modal from "../component/Modal";

const QuestionBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow(!show);
  }

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
      if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls")) {
        setError("Please select an Excel file (.xlsx or .xls)");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file);
    const response = await apiFilePost('/question/upload', formData);
    console.log("Response:", response);
    if (response.successMessage !== undefined) {
      setData(response);
      setError(null);
      changeShow();
    } else {
      setError(response.errorMessage);
    }
  };

  const downloadTemplate = () => {
    const data = [
      [
        "topicId", "questionDetail", "optionA", "optionB", "optionC", "optionD",
        "answer", "numAnswers", "questionTypeId", "difficultyLevel", "answerValue", "negativeMarkValue",
      ],
      [
        "1000", "What is Java?", "Programming Language", "Scripting Language",
        "Markup Language", "Bike", "A", "1", "SINGLE_CHOICE", "1", "2", "1",
      ],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet["!cols"] = [
      { wch: 10 }, { wch: 30 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
      { wch: 20 }, { wch: 10 }, { wch: 12 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");
    XLSX.writeFile(workbook, "question_template.xlsx");
  };

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Upload Questions from Excel</CommonHeading>
        </CommonHeader>

        <FormContainer>
          <ButtonContainer>
            <FileInput
              type="file"
              accept=".xlsx,.xls"
              onChange={handleChange}
            />
            <Button onClick={handleUpload}>Upload</Button>
          </ButtonContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {show && <Modal>{data?.successMessage}</Modal>}
        </FormContainer>

        <Button onClick={downloadTemplate}>Download Template</Button>
      </CommonContainer>
    </Layout>
  );
};

export default QuestionBulkUpload;
