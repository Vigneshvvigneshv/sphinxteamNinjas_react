import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AddButton,
  Button,
  ButtonContainer,
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  CommonTable,
  Content,
  DeleteButton,
  Dropdown,
  ExamContainer,
  ExamHeader,
  Outer,
  RowContainer,
  TableHeading,
  TableRow,
} from "../styles/common_style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPlus, FaTrash } from "react-icons/fa";
import { ErrorMessage, Form, FormInput, FormLabel } from "../styles/form_style";
import { NavButton } from "../styles/header_style";
import Empty from "../component/Empty";
import Modal from "../component/Modal";
import { toast } from "sonner";
import { apiDelete, apiGet, apiPost } from "../ApiServices/apiServices";
import { validateAddTopicExam } from "../validation/ValidationUtil";

const ExamTopicPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // ── exam meta ─────────────────────────────────────────────────────────────
  const [examName, setExamName] = useState();
  const [examId, setExamId] = useState(null);

  // ── section 1: assigned topics ────────────────────────────────────────────
  const [assignedTopics, setAssignedTopics] = useState([]);
  const [showAssigned, setShowAssigned] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [topicToRemove, setTopicToRemove] = useState(null);
  const [indexToRemove, setIndexToRemove] = useState(null);

  // ── section 2: add topics form ────────────────────────────────────────────
  const [allTopics, setAllTopics] = useState([]);
  const [rows, setRows] = useState([
    { topicId: "", percentage: "", topicPassPercentage: "" },
  ]);
  const [error, setError] = useState({});

  // ── total percentage across all rows ──────────────────────────────────────
  const totalPercentage = rows.reduce(
    (acc, row) => acc + Number(row.percentage || 0),
    0
  );

  // ── examName from navigation state ────────────────────────────────────────
  useEffect(() => {
    if (location.state?.examName) setExamName(location.state.examName);
  }, []);

  if (examName === undefined) {
    navigate("/admin-dashboard");
  }

  // ── fetch: all topics for dropdown ────────────────────────────────────────
  useEffect(() => {
    const fetchAllTopics = async () => {
      const response = await apiGet("/topic/getall-topic");
      if (response.responseMessage === "success") {
        setAllTopics(response.topicList);
      }
    };
    fetchAllTopics();
  }, []);

  // ── fetch: topics already assigned to this exam ───────────────────────────
  useEffect(() => {
    const fetchAssignedTopics = async () => {
      const response = await apiGet(
        `/exam-topic/get-topicby-examid?examId=${id}`
      );
      if (response.message === "success") {
        setExamName(response.examName);
        setExamId(response.examId);
        if (response.topicList.length > 0) {
          setAssignedTopics(response.topicList);
          setRows(response.topicList);
        }
      }
    };
    fetchAssignedTopics();
  }, [id]);

  // ── row helpers ───────────────────────────────────────────────────────────
  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
    setError({});
  };

  const addRow = () => {
    if (totalPercentage < 100) {
      setRows([...rows, { topicId: "", percentage: "", topicPassPercentage: "" }]);
      setError((prev) => ({ ...prev, errorMessage: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        errorMessage: "Percentage cannot exceed 100",
      }));
    }
  };

  // ── assign topics to exam ─────────────────────────────────────────────────
  const handleAssign = async (e) => {
    e.preventDefault();

    for (const row of rows) {
      const validationErrors = validateAddTopicExam(row);
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
      }
    }

    if (totalPercentage !== 100) {
      setError({ errorMessage: "Percentage must be equal to 100" });
      return;
    }

    const response = await apiPost("/exam-topic/create-topic-in-exam", {
      examId: examId,
      topics: rows,
    });

    if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success(response.successMessage, { position: "top-center" });
      // re-fetch assigned topics to reflect changes
      const updated = await apiGet(
        `/exam-topic/get-topicby-examid?examId=${id}`
      );
      if (updated.message === "success") {
        setAssignedTopics(updated.topicList);
      }
    }
  };

  // ── remove row: no API if row is empty, API only if row has saved data ───
  const removeRow = (topicId, index) => {
    const row = rows[index];
    const isEmpty = !row.topicId && !row.percentage && !row.topicPassPercentage;

    if (isEmpty) {
      // row was never saved — just remove it locally
      setRows((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    // row has data — open confirm modal to call the API
    setTopicToRemove(topicId);
    setIndexToRemove(index);
    setShowDelete(true);
  };

  // ── confirm delete: called only when row has existing data ────────────────
  const onDelete = async () => {
    const response = await apiDelete(
      "/exam-topic/delete-topic-in-exam-topic",
      { examId: examId, topicId: topicToRemove }
    );

    if (response.responseMessage === "success") {
      toast.success(response.message, { position: "top-center" });
      setRows((prev) => prev.filter((_, i) => i !== indexToRemove));
      setAssignedTopics((prev) =>
        prev.filter((t) => t.topicId !== topicToRemove)
      );
    } else {
      toast.error(response.message, { position: "top-center" });
    }

    setShowDelete(false);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <CommonContainer>

        {/* ══ Section 1: Assigned Topics ══════════════════════════════════ */}
        <CommonHeader>
          <CommonHeading>{examName} - Assigned Topics</CommonHeading>
          <ButtonContainer>
            <Button onClick={() => setShowAssigned((prev) => !prev)}>
              {showAssigned ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}{" "}
              {showAssigned ? "Hide" : "View Assigned Topics"}
            </Button>
          </ButtonContainer>
        </CommonHeader>

        <CommonSection>
          <CommonTable>
            {showAssigned && (
              <ExamContainer style={{ display: "block" }}>
                {assignedTopics.length === 0 ? (
                  <Empty>No topics assigned to this exam yet</Empty>
                ) : (
                  assignedTopics.map((topic, index) => (
                    <ExamHeader key={topic.topicId}>
                      <Content>{topic.topicName}</Content>
                      <DeleteButton
                        onClick={() => openDeleteModal(topic.topicId, index)}
                      >
                        <FaTrash /> Remove
                      </DeleteButton>
                    </ExamHeader>
                  ))
                )}
              </ExamContainer>
            )}
          </CommonTable>
        </CommonSection>

        {/* ══ Section 2: Add Topics Form ══════════════════════════════════ */}
        <CommonSection>
          <CommonHeader>
            <CommonHeading>Add Topics to Exam</CommonHeading>
            <AddButton type="button" onClick={addRow}>
              <FaPlus /> Add Row
            </AddButton>
          </CommonHeader>

            <CommonTable>
          <Form onSubmit={handleAssign}>

            {allTopics.length > 0 && rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>

                  <Dropdown
                    value={row.topicId}
                    onChange={(e) =>
                      handleRowChange(index, "topicId", e.target.value)
                    }
                  >
                    <option value="">Select the topic</option>
                    {allTopics.map((topic) => (
                      <option key={topic.topicId} value={topic.topicId}>
                        {topic.topicName}
                      </option>
                    ))}
                  </Dropdown>
                  {error.topicId && (
                    <ErrorMessage>{error.topicId}</ErrorMessage>
                  )}

                  <Outer>
                    <RowContainer>
                      <FormLabel>Percentage</FormLabel>
                      <FormInput
                        type="text"
                        value={row.percentage}
                        onChange={(e) =>
                          handleRowChange(index, "percentage", e.target.value)
                        }
                        placeholder="Enter percentage"
                      />
                    </RowContainer>
                    {error.percentage && (
                      <ErrorMessage>{error.percentage}</ErrorMessage>
                    )}
                  </Outer>

                  <Outer>
                    <RowContainer>
                      <FormLabel>Pass Percentage</FormLabel>
                      <FormInput
                        type="text"
                        value={row.topicPassPercentage}
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "topicPassPercentage",
                            e.target.value
                          )
                        }
                        placeholder="Enter pass percentage"
                      />
                    </RowContainer>
                    {error.topicPassPercentage && (
                      <ErrorMessage>{error.topicPassPercentage}</ErrorMessage>
                    )}
                  </Outer>

                  <RowContainer>
                    <DeleteButton
                      type="button"
                      onClick={() => removeRow(row.topicId, index)}
                    >
                      <FaTrash />
                    </DeleteButton>
                  </RowContainer>

                </TableRow>
              ))
            ) : (
              <Empty>No topics available</Empty>
            )}

            {error.errorMessage && (
              <ErrorMessage>{error.errorMessage}</ErrorMessage>
            )}

            <ButtonContainer>
              <NavButton to="/admin-dashboard">Back</NavButton>
              <NavButton onClick={handleAssign}>Assign Topics</NavButton>
            </ButtonContainer>
          </Form>
            </CommonTable>
        </CommonSection>

      </CommonContainer>

      {/* ── Delete Confirm Modal ─────────────────────────────────────────── */}
      {showDelete && (
        <Modal
          title="Remove Topic"
          onConfirm={onDelete}
          onCancel={() => setShowDelete(false)}
          type="delete"
          showConfirmButton={true}
        >
          Are you sure you want to remove this topic from the exam?
        </Modal>
      )}
    </Layout>
  );
};

export default ExamTopicPage;
