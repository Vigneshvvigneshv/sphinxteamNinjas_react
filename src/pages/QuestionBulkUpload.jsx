import React, { useState } from "react";
import * as XLSX from "xlsx";
import Layout from "../component/Layout";
import { apiFilePost } from "../ApiServices/apiServices";
import Modal from "../component/Modal";
import { useSelector } from "react-redux";
import { FaFileExcel, FaCloudUploadAlt, FaDownload, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import {
  BulkUploadPage,
  BulkPageHeader,
  BulkPageTitle,
  BulkPanel,
  BulkPanelHeader,
  BulkPanelTitleGroup,
  BulkPanelIconBox,
  BulkPanelTitle,
  BulkPanelBody,
  DropZone,
  DropZoneText,
  DropZoneSubText,
  HiddenInput,
  FileName,
  BulkActionRow,
  BulkPrimaryBtn,
  BulkSecondaryBtn,
  BulkErrorMsg,
  BulkSuccessMsg,
  BulkDivider,
} from "../styles/bulkUpload_style";

const QuestionBulkUpload = () => {
  const theme = useSelector((state) => state.themeReducer.theme);

  const [file, setFile]       = useState(null);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow]       = useState(false);
  const [data, setData]       = useState(null);

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
      setSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiFilePost("/question/upload", formData);
    if (response.successMessage !== undefined) {
      setData(response);
      setError(null);
      setSuccess(response.successMessage);
      setShow(true);
    } else {
      setError(response.errorMessage);
      setSuccess(null);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      [
        "topicId", "questionDetail", "optionA", "optionB", "optionC", "optionD",
        "answer", "numAnswers", "questionTypeId", "difficultyLevel", "answerValue", "negativeMarkValue",
      ],
      [
        "1000", "What is Java?", "Programming Language", "Scripting Language",
        "Markup Language", "Bike", "A", "1", "SINGLE_CHOICE", "1", "2", "1",
      ],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
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
      <BulkUploadPage theme={theme}>

        {/* ── Page header ─────────────────────────────────────────────── */}
        <BulkPageHeader>
          <BulkPageTitle theme={theme}>
            Bulk Upload
            <span>Import questions from Excel</span>
          </BulkPageTitle>
        </BulkPageHeader>

        {/* ── Upload panel ─────────────────────────────────────────────── */}
        <BulkPanel theme={theme}>
          <BulkPanelHeader theme={theme}>
            <BulkPanelTitleGroup>
              <BulkPanelIconBox $bg="#EFF6FF" $color="#3B82F6">
                <FaFileExcel />
              </BulkPanelIconBox>
              <BulkPanelTitle theme={theme}>Upload Questions</BulkPanelTitle>
            </BulkPanelTitleGroup>
          </BulkPanelHeader>

          <BulkPanelBody>
            {/* Drop zone */}
            <DropZone $hasFile={!!file} theme={theme} htmlFor="bulk-file-input">
              <FaCloudUploadAlt />
              <DropZoneText theme={theme}>
                {file ? "File selected" : "Click to select an Excel file"}
              </DropZoneText>
              <DropZoneSubText theme={theme}>
                Supports .xlsx and .xls formats
              </DropZoneSubText>
              {file && <FileName>{file.name}</FileName>}
              <HiddenInput
                id="bulk-file-input"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleChange}
              />
            </DropZone>

            {/* Error / success feedback */}
            {error && (
              <BulkErrorMsg theme={theme}>
                <FaExclamationCircle /> {error}
              </BulkErrorMsg>
            )}
            {success && (
              <BulkSuccessMsg theme={theme}>
                <FaCheckCircle /> {success}
              </BulkSuccessMsg>
            )}

            <BulkDivider theme={theme} />

            {/* Action buttons */}
            <BulkActionRow>
              <BulkPrimaryBtn theme={theme} onClick={handleUpload} disabled={!file}>
                <FaCloudUploadAlt /> Upload
              </BulkPrimaryBtn>
              <BulkSecondaryBtn theme={theme} onClick={downloadTemplate}>
                <FaDownload /> Download Template
              </BulkSecondaryBtn>
            </BulkActionRow>
          </BulkPanelBody>
        </BulkPanel>

      </BulkUploadPage>

      {show && (
        <Modal
          type="info"
          title="Upload Successful"
          onCancel={() => setShow(false)}
          showConfirmButton={false}
        >
          {data?.successMessage}
        </Modal>
      )}
    </Layout>
  );
};

export default QuestionBulkUpload;
