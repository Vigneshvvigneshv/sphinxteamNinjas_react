import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaAngleDoubleDown, FaAngleDoubleUp, FaPen, FaPlus,
  FaTrash, FaCheckCircle, FaListAlt, FaTags,
} from "react-icons/fa";
import { ErrorMessage } from "../styles/form_style";
import Modal from "../component/Modal";
import { toast } from "sonner";
import { apiDelete, apiGet, apiPost } from "../ApiServices/apiServices";
import { validateAddTopicExam } from "../validation/ValidationUtil";

import {
  ETPWrap,
  ETPHeader,
  ETPTitle,
  ETPHeaderActions,
  ETPSection,
  ETPSectionHeader,
  ETPSectionTitle,
  ETPSectionBody,
  ETPProgressWrap,
  ETPProgressBar,
  ETPProgressLabel,
  ETPToggleBtn,
  ETPAddRowBtn,
  ETPTopicRow,
  ETPTopicName,
  ETPTopicBadge,
  ETPTopicActions,
  ETPEditBtn,
  ETPDeleteBtn,
  ETPFormRow,
  ETPFieldWrap,
  ETPFieldLabel,
  ETPSelect,
  ETPInput,
  ETPError,
  ETPFooter,
  ETPFooterNote,
  ETPFooterBtns,
  ETPBackBtn,
  ETPAssignBtn,
  ETPEmpty,
  ETPCompleteBadge,
} from "../styles/examTopicPage_style";

// ── Edit Modal inline styles (reuse existing Modal component) ─────────────────
const modalField = {
  display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px",
};
const modalLabel = {
  fontSize: "12px", fontWeight: "600", color: "#6b7280",
  textTransform: "uppercase", letterSpacing: "0.05em",
};
const modalInput = {
  padding: "9px 12px", fontSize: "13px", color: "#111827",
  background: "#fff", border: "1px solid #d1d5db",
  borderRadius: "8px", outline: "none", width: "100%",
  boxSizing: "border-box", fontFamily: "'Sora','Segoe UI',sans-serif",
};
const modalSelect = { ...modalInput };

const ExamTopicPage = () => {
  const navigate = useNavigate();
  const { id, examName } = useParams();

  // ── section 1: assigned topics ────────────────────────────────────────────
  const [assignedTopics, setAssignedTopics] = useState([]);
  const [showAssigned, setShowAssigned]     = useState(false);
  const [showDelete, setShowDelete]         = useState(false);
  const [topicToRemove, setTopicToRemove]   = useState(null);
  const [indexToRemove, setIndexToRemove]   = useState(null);

  // ── edit modal ────────────────────────────────────────────────────────────
  const [showEdit, setShowEdit]   = useState(false);
  const [editData, setEditData]   = useState({ topicId: "", percentage: "", topicPassPercentage: "" });
  const [editError, setEditError] = useState({});

  // ── percentage ────────────────────────────────────────────────────────────
  const [percentage, setPercentage] = useState(0);

  // ── section 2: add topics form ────────────────────────────────────────────
  const [allTopics, setAllTopics] = useState([]);
  const [rows, setRows] = useState([{ topicId: "", percentage: "", topicPassPercentage: "" }]);
  const [error, setError] = useState({});

  // ── derived: available topics ─────────────────────────────────────────────
  const getAvailableTopics = (currentRowIndex) => {
    const assignedIds = new Set(assignedTopics.map((t) => t.topicId));
    const selectedInOtherRows = new Set(
      rows.filter((_, i) => i !== currentRowIndex).map((r) => r.topicId).filter(Boolean)
    );
    return allTopics.filter(
      (t) => !assignedIds.has(t.topicId) && !selectedInOtherRows.has(t.topicId)
    );
  };

  const getEditAvailableTopics = (currentTopicId) => {
    const assignedIds = new Set(assignedTopics.map((t) => t.topicId));
    return allTopics.filter(
      (t) => !assignedIds.has(t.topicId) || t.topicId === currentTopicId
    );
  };

  const syncPercentage = (topicList) => {
    const total = topicList.reduce((acc, t) => acc + Number(t.percentage || 0), 0);
    setPercentage(total);
  };

  // ── fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAllTopics = async () => {
      const response = await apiGet("/topic/getall-topic");
      if (response.responseMessage === "success") setAllTopics(response.topicList);
    };
    fetchAllTopics();
  }, []);

  useEffect(() => {
    const fetchAssignedTopics = async () => {
      const response = await apiGet(`/exam-topic/get-topicby-examid?examId=${id}`);
      if (response.message === "success" && response.topicList.length > 0) {
        setAssignedTopics(response.topicList);
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

  // ── assign ────────────────────────────────────────────────────────────────
  const handleAssign = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (percentage >= 100) {
      toast.error("Percentage cannot be more than 100", { position: "top-center" });
      return;
    }
    for (const row of rows) {
      const validationErrors = validateAddTopicExam(row);
      if (Object.keys(validationErrors).length > 0) { setError(validationErrors); return; }
    }
    const rowsTotal = rows.reduce((acc, row) => acc + Number(row.percentage || 0), 0);
    if (percentage + rowsTotal > 100) {
      toast.error("Percentage cannot be more than 100", { position: "top-center" });
      return;
    }
    const response = await apiPost("/exam-topic/create-topic-in-exam", { examId: id, topics: rows });
    if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success("Topic added successfully", { position: "top-center" });
      const updated = await apiGet(`/exam-topic/get-topicby-examid?examId=${id}`);
      if (updated.message === "success") {
        setAssignedTopics(updated.topicList);
        syncPercentage(updated.topicList);
      }
      setRows([{ topicId: "", percentage: "", topicPassPercentage: "" }]);
      setError({});
    }
  };

  const removeRow = (topicId, index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // ── delete ────────────────────────────────────────────────────────────────
  const onDelete = async () => {
    const response = await apiDelete("/exam-topic/delete-topic-in-exam-topic", {
      examId: id, topicId: topicToRemove,
    });
    if (response.responseMessage === "success") {
      toast.success(response.message, { position: "top-center" });
      const updatedTopics = assignedTopics.filter((t) => t.topicId !== topicToRemove);
      setAssignedTopics(updatedTopics);
      syncPercentage(updatedTopics);
    } else {
      toast.error(response.message, { position: "top-center" });
    }
    setShowDelete(false);
  };

  // ── edit ──────────────────────────────────────────────────────────────────
  const openEditModal = (topic) => {
    setEditData({ topicId: topic.topicId, percentage: topic.percentage, topicPassPercentage: topic.topicPassPercentage });
    setEditError({});
    setShowEdit(true);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    setEditError((prev) => ({ ...prev, [field]: "" }));
  };

  const handleEditUpdate = async () => {
    const validationErrors = validateAddTopicExam(editData);
    if (Object.keys(validationErrors).length > 0) { setEditError(validationErrors); return; }
    const response = await apiPost("/exam-topic/create-topic-in-exam", {
      examId: id,
      topics: [{ topicId: editData.topicId, percentage: editData.percentage, topicPassPercentage: editData.topicPassPercentage }],
    });
    if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success("Topic updated successfully", { position: "top-center" });
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

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <ETPWrap>

        {/* ── Page Header ──────────────────────────────────────────────── */}
        <ETPHeader>
          <ETPTitle>
            {examName}
            <span>Manage topics assigned to this exam</span>
          </ETPTitle>
        </ETPHeader>

        {/* ── Progress Bar ─────────────────────────────────────────────── */}
        <ETPProgressWrap>
          <ETPProgressBar $pct={percentage} />
          <ETPProgressLabel $pct={percentage}>
            {percentage}% / 100%
          </ETPProgressLabel>
        </ETPProgressWrap>

        {/* ── Assigned Topics Section ───────────────────────────────────── */}
        <ETPSection $delay="0.05s">
          <ETPSectionHeader>
            <ETPSectionTitle>
              <FaTags />
              Assigned Topics
              {assignedTopics.length > 0 && (
                <span style={{
                  background: "#eef2ff", color: "#6366f1", border: "1px solid #c7d2fe",
                  borderRadius: "99px", padding: "1px 9px", fontSize: "12px", fontWeight: 700,
                }}>
                  {assignedTopics.length}
                </span>
              )}
            </ETPSectionTitle>
            <ETPToggleBtn onClick={() => setShowAssigned((prev) => !prev)}>
              {showAssigned ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
              {showAssigned ? "Hide" : "View Topics"}
            </ETPToggleBtn>
          </ETPSectionHeader>

          {showAssigned && (
            <ETPSectionBody>
              {assignedTopics.length === 0 ? (
                <ETPEmpty>
                  <FaListAlt />
                  No topics assigned to this exam yet
                </ETPEmpty>
              ) : (
                assignedTopics.map((topic, index) => (
                  <ETPTopicRow key={topic.topicId}>
                    <ETPTopicName>{topic.topicName}</ETPTopicName>
                    <ETPTopicBadge>
                      {topic.percentage}%
                    </ETPTopicBadge>
                    <ETPTopicBadge $type="pass">
                      Pass {topic.topicPassPercentage}%
                    </ETPTopicBadge>
                    <ETPTopicActions>
                      <ETPEditBtn title="Edit topic" onClick={() => openEditModal(topic)}>
                        <FaPen />
                      </ETPEditBtn>
                      <ETPDeleteBtn title="Remove topic" onClick={() => openDeleteModal(topic.topicId, index)}>
                        <FaTrash />
                      </ETPDeleteBtn>
                    </ETPTopicActions>
                  </ETPTopicRow>
                ))
              )}
            </ETPSectionBody>
          )}
        </ETPSection>

        {/* ── Add Topics Section ────────────────────────────────────────── */}
        <ETPSection $delay="0.1s">
          <ETPSectionHeader>
            <ETPSectionTitle>
              <FaListAlt />
              Add Topics to Exam
            </ETPSectionTitle>
            {percentage < 100 && (
              <ETPAddRowBtn type="button" onClick={addRow}>
                <FaPlus /> Add Row
              </ETPAddRowBtn>
            )}
          </ETPSectionHeader>

          <ETPSectionBody>
            {percentage === 100 ? (
              <ETPCompleteBadge>
                <FaCheckCircle />
                100% topics added — this exam is fully configured.
              </ETPCompleteBadge>
            ) : allTopics.length > 0 && rows.length > 0 ? (
              rows.map((row, index) => (
                <ETPFormRow key={index}>
                  {/* Topic dropdown */}
                  <ETPFieldWrap>
                    <ETPFieldLabel>Topic</ETPFieldLabel>
                    <ETPSelect
                      value={row.topicId}
                      onChange={(e) => handleRowChange(index, "topicId", e.target.value, e)}
                      name="topicId"
                    >
                      <option value="">Select topic…</option>
                      {getAvailableTopics(index).map((topic) => (
                        <option key={topic.topicId} value={topic.topicId}>
                          {topic.topicName}
                        </option>
                      ))}
                    </ETPSelect>
                    {error.topicId && <ETPError>{error.topicId}</ETPError>}
                  </ETPFieldWrap>

                  {/* Percentage */}
                  <ETPFieldWrap>
                    <ETPFieldLabel>Percentage</ETPFieldLabel>
                    <ETPInput
                      type="text"
                      value={row.percentage}
                      onChange={(e) => handleRowChange(index, "percentage", e.target.value, e)}
                      name="percentage"
                      placeholder="e.g. 40"
                    />
                    {error.percentage && <ETPError>{error.percentage}</ETPError>}
                  </ETPFieldWrap>

                  {/* Pass Percentage */}
                  <ETPFieldWrap>
                    <ETPFieldLabel>Pass %</ETPFieldLabel>
                    <ETPInput
                      type="text"
                      value={row.topicPassPercentage}
                      onChange={(e) => handleRowChange(index, "topicPassPercentage", e.target.value, e)}
                      name="topicPassPercentage"
                      placeholder="e.g. 60"
                    />
                    {error.topicPassPercentage && <ETPError>{error.topicPassPercentage}</ETPError>}
                  </ETPFieldWrap>

                  {/* Remove row */}
                  <ETPDeleteBtn
                    type="button"
                    style={{ alignSelf: "flex-end", marginBottom: "2px" }}
                    onClick={() => removeRow(row.topicId, index)}
                    title="Remove row"
                  >
                    <FaTrash />
                  </ETPDeleteBtn>
                </ETPFormRow>
              ))
            ) : (
              <ETPEmpty>
                <FaPlus />
                Click "Add Row" to start adding topics
              </ETPEmpty>
            )}
          </ETPSectionBody>

          <ETPFooter>
            <ETPFooterNote>
              {percentage < 100
                ? `${percentage}% assigned · ${100 - percentage}% remaining`
                : "All 100% assigned"}
            </ETPFooterNote>
            <ETPFooterBtns>
              <ETPBackBtn type="button" onClick={() => navigate("/admin-dashboard")}>
                Back
              </ETPBackBtn>
              {percentage < 100 && (
                <ETPAssignBtn type="button" onClick={handleAssign}>
                  <FaCheckCircle /> Assign Topics
                </ETPAssignBtn>
              )}
            </ETPFooterBtns>
          </ETPFooter>
        </ETPSection>

      </ETPWrap>

      {/* ── Delete Confirm Modal ──────────────────────────────────────────── */}
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

      {/* ── Edit Topic Modal ──────────────────────────────────────────────── */}
      {showEdit && (
        <Modal
          title="Edit Topic"
          onConfirm={handleEditUpdate}
          onCancel={() => setShowEdit(false)}
          showConfirmButton={true}
          type="edit"
        >
          <div style={{ padding: "4px 0" }}>

            <div style={modalField}>
              <label style={modalLabel}>Topic</label>
              <select
                value={editData.topicId}
                onChange={(e) => handleEditChange("topicId", e.target.value)}
                style={modalSelect}
              >
                <option value="">Select topic…</option>
                {getEditAvailableTopics(editData.topicId).map((topic) => (
                  <option key={topic.topicId} value={topic.topicId}>
                    {topic.topicName}
                  </option>
                ))}
              </select>
              {editError.topicId && <ErrorMessage>{editError.topicId}</ErrorMessage>}
            </div>

            <div style={modalField}>
              <label style={modalLabel}>Percentage</label>
              <input
                type="text"
                value={editData.percentage}
                onChange={(e) => handleEditChange("percentage", e.target.value)}
                placeholder="Enter percentage"
                style={modalInput}
              />
              {editError.percentage && <ErrorMessage>{editError.percentage}</ErrorMessage>}
            </div>

            <div style={{ ...modalField, marginBottom: 0 }}>
              <label style={modalLabel}>Pass Percentage</label>
              <input
                type="text"
                value={editData.topicPassPercentage}
                onChange={(e) => handleEditChange("topicPassPercentage", e.target.value)}
                placeholder="Enter pass percentage"
                style={modalInput}
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
