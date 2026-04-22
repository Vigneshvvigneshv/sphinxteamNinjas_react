import { useState } from "react";


import { Button } from "flowbite-react";
import {
  FaAlignLeft,
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaArrowAltCircleRight,
  FaBan,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaLayerGroup,
  FaRedo,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import BackDrop from "./BackDrop";
import {  } from "../styles/form_style";
import { FaX } from "react-icons/fa6";
import { NavButton} from "../styles/header_style";
import { FileX } from "lucide-react";
import { AttemptsLabel, 
        AttemptsNumbers,
        AttemptsRow, 
        AttemptsRowTop, 
        AttemptsTag, 
        Bar, 
        BarFill, 
        Card, 
        CardFooter, 
        CardIconBox, 
        CardId, 
        CardTitle, 
        CardTop, 
        CardTopRow,  
        DetailIcon,  
        DetailRow, 
        DetailsPanel, 
        DetailsToggle, 
        DetailText, 
        NoAttemptsMsg, QuickChip, QuickStats, StartExamBtn } from "../styles/UserExamTable_style";

export const UserExamTable = ({ data, handleStartExam }) => {
  const [show, setShow] = useState(false);

  // ── Derived from your exact field names ──
  const used    = data.noOfAttempts ?? 0;
  const allowed = data.allowedAttempts ?? null;
  const left    = allowed !== null ? Math.max(0, allowed - used) : null;
  const pct     = allowed > 0 ? Math.round((left / allowed) * 100) : 100;
  const canStart = left === null || left > 0;

  return (
    <Card $noAttempts={!canStart}>
      {/* ── Top section ── */}
      <CardTop>
        <CardTopRow>
          <CardIconBox><FaBook /></CardIconBox>
          <AttemptsTag $left={left}>
            <FaRedo size={9} />
            {left === null
              ? "Unlimited attempts"
              : left === 0
              ? "No attempts left"
              : `${left} attempt${left !== 1 ? "s" : ""} left`}
          </AttemptsTag>
        </CardTopRow>

        <CardTitle>{data.examName || "Untitled Exam"}</CardTitle>
        {data.examId && <CardId>ID: #{data.examId}</CardId>}

        {/* Quick chips */}
        <QuickStats>
          {data.duration != null && (
            <QuickChip $iconColor="#F59E0B">
              <FaClock size={11} /> {data.duration} min
            </QuickChip>
          )}
          {data.noOfQuestions != null && (
            <QuickChip $iconColor="#3B82F6">
              <FaLayerGroup size={11} /> {data.noOfQuestions} Questions
            </QuickChip>
          )}
          {left != null && (
            <QuickChip $iconColor={left === 0 ? "#EF4444" : left === 1 ? "#D97706" : "#10B981"}>
              <FaRedo size={10} />
              <span style={{ color: left === 0 ? "#EF4444" : left === 1 ? "#D97706" : "#10B981" }}>
                {left} left
              </span>
            </QuickChip>
          )}
        </QuickStats>

        {/* Attempts progress bar */}
        {allowed != null && (
          <AttemptsRow>
            <AttemptsRowTop>
              <AttemptsLabel><FaRedo size={10} /> Attempts used</AttemptsLabel>
              <AttemptsNumbers>{used} / {allowed}</AttemptsNumbers>
            </AttemptsRowTop>
            <Bar><BarFill $pct={pct} /></Bar>
          </AttemptsRow>
        )}
      </CardTop>

      {/* ── Toggle details ── */}
      <DetailsToggle $open={show} onClick={() => setShow(!show)}>
        {show ? "Hide Details" : "View Details"}
        {show ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
      </DetailsToggle>

      {show && (
        <DetailsPanel>
          {data.description && (
            <DetailRow>
              <DetailIcon $bg="rgba(79,70,229,0.07)" $border="rgba(79,70,229,0.12)" $color="#4F46E5">
                <FaAlignLeft />
              </DetailIcon>
              <DetailText>
                <div className="lbl">Description</div>
                <div className="val">{data.description}</div>
              </DetailText>
            </DetailRow>
          )}
          {data.duration != null && (
            <DetailRow>
              <DetailIcon $bg="rgba(245,158,11,0.08)" $border="rgba(245,158,11,0.2)" $color="#F59E0B">
                <FaClock />
              </DetailIcon>
              <DetailText>
                <div className="lbl">Duration</div>
                <div className="val">{data.duration} minutes</div>
              </DetailText>
            </DetailRow>
          )}
          {data.noOfQuestions != null && (
            <DetailRow>
              <DetailIcon $bg="rgba(59,130,246,0.08)" $border="rgba(59,130,246,0.18)" $color="#3B82F6">
                <FaLayerGroup />
              </DetailIcon>
              <DetailText>
                <div className="lbl">Total Questions</div>
                <div className="val">{data.noOfQuestions}</div>
              </DetailText>
            </DetailRow>
          )}
          {allowed != null && (
            <DetailRow>
              <DetailIcon $bg="rgba(139,92,246,0.08)" $border="rgba(139,92,246,0.18)" $color="#8B5CF6">
                <FaRedo />
              </DetailIcon>
              <DetailText>
                <div className="lbl">Allowed Attempts</div>
                <div className="val">{allowed}</div>
              </DetailText>
            </DetailRow>
          )}
          {allowed != null && (
            <DetailRow>
              <DetailIcon
                $bg={left === 0 ? "rgba(239,68,68,0.07)" : "rgba(16,185,129,0.07)"}
                $border={left === 0 ? "rgba(239,68,68,0.18)" : "rgba(16,185,129,0.18)"}
                $color={left === 0 ? "#EF4444" : "#10B981"}
              >
                <FaRedo />
              </DetailIcon>
              <DetailText>
                <div className="lbl">Attempts Remaining</div>
                <div className="val" style={{ color: left === 0 ? "#EF4444" : left === 1 ? "#D97706" : "#10B981" }}>
                  {left}
                </div>
              </DetailText>
            </DetailRow>
          )}
        </DetailsPanel>
      )}

      {/* ── Footer ── */}
      <CardFooter>
        {canStart ? (
          <StartExamBtn onClick={() => handleStartExam(data.examId)}>
            <FaRegArrowAltCircleRight size={14} />
            Start Exam
          </StartExamBtn>
        ) : (
          <NoAttemptsMsg>
            <FaBan size={13} /> No attempts remaining
          </NoAttemptsMsg>
        )}
      </CardFooter>
    </Card>
  )
};
