import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AddButton,
  AnswerContainer,
  Button,
  ButtonContainer,
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  CommonTable,
  Container,
  Content,
  DeleteButton,
  Dropdown,
  EditButton,
  ExamContainer,
  ExamHeader,
  Outer,
  RowContainer,
  TableHeading,
  TableRow,
} from "../styles/common_style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaEdit, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { ErrorMessage, FieldContainer, Form, FormInput, FormLabel } from "../styles/form_style";
import { NavButton } from "../styles/header_style";
import Empty from "../component/Empty";
import Modal from "../component/Modal";
import { toast } from "sonner";
import { apiDelete, apiGet, apiPost } from "../ApiServices/apiServices";
import { validateAddTopicExam } from "../validation/ValidationUtil";

const ExamTopicPage = () => {
  const navigate = useNavigate();
  const { id, examName } = useParams();

  // ── section 1: assigned topics ────────────────────────────────────────────
  const [assignedTopics, setAssignedTopics] = useState([]);
  const [showAssigned, setShowAssigned] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [topicToRemove, setTopicToRemove] = useState(null);
  const [indexToRemove, setIndexToRemove] = useState(null);

  // ── edit modal ────────────────────────────────────────────────────────────
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({ topicId: "", percentage: "", topicPassPercentage: "" });
  const [editError, setEditError] = useState({});

  // ── percentage already consumed by saved/assigned topics ─────────────────
  // FIX 1: This is the single source of truth for saved percentage.
  //         It is recalculated whenever assignedTopics changes.
  const [percentage, setPercentage] = useState(0);

  // ── section 2: add topics form ────────────────────────────────────────────
  const [allTopics, setAllTopics] = useState([]);
  const [rows, setRows] = useState([
    { topicId: "", percentage: "", topicPassPercentage: "" },
  ]);
  const [error, setError] = useState({});

  // ── derived: topics not yet assigned to this exam ─────────────────────────
  // For the add-row dropdown: exclude all assigned topics AND topics already
  // selected in other unsaved rows.
  const getAvailableTopics = (currentRowIndex) => {
    const assignedIds = new Set(assignedTopics.map((t) => t.topicId));
    const selectedInOtherRows = new Set(
      rows
        .filter((_, i) => i !== currentRowIndex)
        .map((r) => r.topicId)
        .filter(Boolean)
    );
    return allTopics.filter(
      (t) => !assignedIds.has(t.topicId) && !selectedInOtherRows.has(t.topicId)
    );
  };

  // For the edit modal dropdown: exclude assigned topics EXCEPT the one being edited.
  const getEditAvailableTopics = (currentTopicId) => {
    const assignedIds = new Set(assignedTopics.map((t) => t.topicId));
    return allTopics.filter(
      (t) => !assignedIds.has(t.topicId) || t.topicId === currentTopicId
    );
  };

  // ── helper: recalculate and sync percentage from a topic list ─────────────
  const syncPercentage = (topicList) => {
    const total = topicList.reduce(
      (acc, t) => acc + Number(t.percentage || 0),
      0
    );
    setPercentage(total);
  };

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
      if (response.message === "success" && response.topicList.length > 0) {
        setAssignedTopics(response.topicList);
        // FIX 2: was using undeclared `totalPercentage` variable (no let/const)
        syncPercentage(response.topicList);
      }
    };
    fetchAssignedTopics();
  }, [id]);

  // ── row helpers ───────────────────────────────────────────────────────────
  const handleRowChange = (index, field, value, e) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
    setError({ ...error, [e.target.name]: "" });
  };

  const addRow = () => {
    if (percentage < 100) {
      setRows([...rows, { topicId: "", percentage: "", topicPassPercentage: "" }]);
      setError((prev) => ({ ...prev, errorMessage: "" }));
    } else {
      toast.error("Percentage cannot be more than 100", { position: "top-center" });
    }
  };

  // ── assign topics to exam ─────────────────────────────────────────────────
  const handleAssign = async (e) => {
    e.preventDefault();

    // Guard — show toast if already at 100%
    if (percentage >= 100) {
      toast.error("Percentage cannot be more than 100", { position: "top-center" });
      return;
    }

    // Validate all rows first
    for (const row of rows) {
      const validationErrors = validateAddTopicExam(row);
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
      }
    }

    // Calculate percentage of rows being submitted now
    const rowsTotal = rows.reduce(
      (acc, row) => acc + Number(row.percentage || 0),
      0
    );

    // Block submit if saved + new rows exceed 100
    if (percentage + rowsTotal > 100) {
      toast.error("Percentage cannot be more than 100", { position: "top-center" });
      return;
    }

    const response = await apiPost("/exam-topic/create-topic-in-exam", {
      examId: id,
      topics: rows,
    });

    if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success("Topic added successfully", { position: "top-center" });

      // Re-fetch assigned topics and update percentage simultaneously
      const updated = await apiGet(
        `/exam-topic/get-topicby-examid?examId=${id}`
      );
      if (updated.message === "success") {
        // FIX 5: Update both assignedTopics AND percentage together so both
        //         sections reflect the new state at the same time.
        setAssignedTopics(updated.topicList);
        syncPercentage(updated.topicList);
      }

      // FIX 6: Reset rows to a single empty row (was passing an object, not array)
      setRows([{ topicId: "", percentage: "", topicPassPercentage: "" }]);
      setError({});
    }
  };

  // ── remove unsaved row from the form ─────────────────────────────────────
  const removeRow = (topicId, index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // ── confirm delete saved topic from exam ──────────────────────────────────
  const onDelete = async () => {
    const response = await apiDelete(
      "/exam-topic/delete-topic-in-exam-topic",
      { examId: id, topicId: topicToRemove }
    );

    if (response.responseMessage === "success") {
      toast.success(response.message, { position: "top-center" });
      const updatedTopics = assignedTopics.filter(
        (t) => t.topicId !== topicToRemove
      );
      // FIX 7: Recalculate percentage after deletion so Add Row / form
      //         become available again if total drops below 100.
      setAssignedTopics(updatedTopics);
      syncPercentage(updatedTopics);
    } else {
      toast.error(response.message, { position: "top-center" });
    }

    setShowDelete(false);
  };

  const openEditModal = (topic) => {
    setEditData({
      topicId: topic.topicId,
      percentage: topic.percentage,
      topicPassPercentage: topic.topicPassPercentage,
    });
    setEditError({});
    setShowEdit(true);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    setEditError((prev) => ({ ...prev, [field]: "" }));
  };

  const handleEditUpdate = async () => {
    const validationErrors = validateAddTopicExam(editData);
    if (Object.keys(validationErrors).length > 0) {
      setEditError(validationErrors);
      return;
    }

    const response = await apiPost("/exam-topic/create-topic-in-exam", {
      examId: id,
      topics:[{
        topicId: editData.topicId,
        percentage: editData.percentage,
        topicPassPercentage: editData.topicPassPercentage
      }]
    });

    if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success("Topic update successfully", { position: "top-center" });
      const updated = await apiGet(`/exam-topic/get-topicby-examid?examId=${id}`);
      if (updated.message === "success") {
        setAssignedTopics(updated.topicList);
        syncPercentage(updated.topicList);
      }
      setShowEdit(false);
    }
  };

  const openDeleteModal = (topicId, index) => {
    setTopicToRemove(topicId);
    setIndexToRemove(index);
    setShowDelete(true);
  };



  return (
    <Layout>
      <CommonContainer>
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
                <CommonTable>
                {assignedTopics.length === 0 ? (
                  <Empty>No topics assigned to this exam yet</Empty>
                ) : (
                  assignedTopics.map((topic, index) => (
                    <TableRow>
                      <Content>{topic.topicName}</Content>
                      <Content>Percentage - {topic.percentage}</Content>
                      <Content>Pass percentage - {topic.topicPassPercentage}</Content>
                      <ButtonContainer>
                        <EditButton onClick={() => openEditModal(topic)}><FaPen /></EditButton>
                        <DeleteButton
                          onClick={() => openDeleteModal(topic.topicId, index)}
                        >
                          <FaTrash /> 
                        </DeleteButton>
                      </ButtonContainer>
                   
                    </TableRow>
                    
                  ))
                )}
                </CommonTable>
              </ExamContainer>
            )}
          </CommonTable>
        </CommonSection>

        <CommonSection>
          <CommonHeader>
            <CommonHeading>Add Topics to Exam</CommonHeading>
            {percentage < 100 && (
              <AddButton type="button" onClick={addRow}>
                <FaPlus /> Add Row
              </AddButton>
            )}
          </CommonHeader>

          <CommonTable>
            <Form onSubmit={handleAssign}>

              {percentage === 100 ? (
                // FIX 9: Show this message and hide the form entirely at 100%
                <Empty>100% topic added to this exam</Empty>
              ) : allTopics.length > 0 && rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={index}>
                    <Outer>
                      <Dropdown
                        value={row.topicId}
                        onChange={(e) =>
                          handleRowChange(index, "topicId", e.target.value, e)
                        }
                        name="topicId"
                      >
                        <option value="">Select the topic</option>
                        {getAvailableTopics(index).map((topic) => (
                          <option key={topic.topicId} value={topic.topicId}>
                            {topic.topicName}
                          </option>
                        ))}
                      </Dropdown>
                      {error.topicId && (
                        <ErrorMessage>{error.topicId}</ErrorMessage>
                      )}
                    </Outer>

                    <Outer>
                      <RowContainer>
                        <FormLabel>Percentage</FormLabel>
                        <FormInput
                          type="text"
                          value={row.percentage}
                          onChange={(e) =>
                            handleRowChange(index, "percentage", e.target.value, e)
                          }
                          name="percentage"
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
                              e.target.value,
                              e
                            )
                          }
                          name="topicPassPercentage"
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
                <Empty>Click + add row to add the topic</Empty>
              )}

              {/* {error.errorMessage && (
                <ErrorMessage>{error.errorMessage}</ErrorMessage>
              )} */}
              { percentage < 100 && <Content>{percentage}% added out of 100%</Content>}
              <Container>
                <NavButton to="/admin-dashboard">Back</NavButton>
                {percentage<100 && <NavButton onClick={handleAssign}>
                  Assign Topics
                </NavButton>}
              </Container>
            </Form>
          </CommonTable>
        </CommonSection>

      </CommonContainer>

      {/*Delete Confirm Modal*/}
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

      {/*  Edit Topic Modal */}
      {showEdit && (
        <Modal
          title="Edit Topic"
          onConfirm={handleEditUpdate}
          onCancel={() => setShowEdit(false)}
          showConfirmButton={true}
          type="edit"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "8px 0" }}>

            {/* Topic Dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Topic</label>
              <Dropdown
                value={editData.topicId}
                onChange={(e) => handleEditChange("topicId", e.target.value)}
                name="topicId"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px" }}
              >
                <option value="">Select the topic</option>
                {getEditAvailableTopics(editData.topicId).map((topic) => (
                  <option key={topic.topicId} value={topic.topicId}>
                    {topic.topicName}
                  </option>
                ))}
              </Dropdown>
              {editError.topicId && <ErrorMessage>{editError.topicId}</ErrorMessage>}
            </div>

            {/* Percentage */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Percentage</label>
              <FormInput
                type="text"
                value={editData.percentage}
                onChange={(e) => handleEditChange("percentage", e.target.value)}
                name="percentage"
                placeholder="Enter percentage"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", boxSizing: "border-box" }}
              />
              {editError.percentage && <ErrorMessage>{editError.percentage}</ErrorMessage>}
            </div>

            {/* Pass Percentage */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Pass Percentage</label>
              <FormInput
                type="text"
                value={editData.topicPassPercentage}
                onChange={(e) => handleEditChange("topicPassPercentage", e.target.value)}
                name="topicPassPercentage"
                placeholder="Enter pass percentage"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", boxSizing: "border-box" }}
              />
              {editError.topicPassPercentage && <ErrorMessage>{editError.topicPassPercentage}</ErrorMessage>}
            </div>

          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default ExamTopicPage;
