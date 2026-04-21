import styled, { createGlobalStyle, css, keyframes } from "styled-components"

// / ─── Global styles ────────────────────────────────────────────────────────────
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0f2f8; }
`

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`
const pulse  = keyframes`0%,100% { opacity: 1; } 50% { opacity: 0.5; }`
const tickAnim = keyframes`0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; }`

// ─── Layout wrappers ─────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f8;
  z-index:99;
`

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e4e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 12px rgba(0,0,0,0.06);
`

export const ExamTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #1a1d2e;
  letter-spacing: -0.01em;
`

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'Fira Code', monospace;
  font-size: 17px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 10px;
  border: 1.5px solid ${p => p.$danger ? '#fee2e2' : p.$warn ? '#fef3c7' : '#e4e8f0'};
  background: ${p => p.$danger ? '#fff5f5' : p.$warn ? '#fffbeb' : '#f8faff'};
  color: ${p => p.$danger ? '#dc2626' : p.$warn ? '#d97706' : '#374151'};
  transition: all 0.3s;
  min-width: 90px;
  justify-content: center;
`

export const SubmitBtn = styled.button`
  padding: 8px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: opacity 0.2s, transform 0.15s;
  &:hover { opacity: 0.92; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`

// ─── Body layout ─────────────────────────────────────────────────────────────
export const BodyLayout = styled.div`
  display: flex;
  flex: 1;
  gap: 0;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  padding: 24px 20px;
  gap: 20px;
  align-items: flex-start;
`

// ─── Main question panel ──────────────────────────────────────────────────────
export const MainPanel = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
`

export const QuestionCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #e4e8f0;
  padding: 28px 32px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05);
`

export const QMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

export const QLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6366f1;
`

export const QTypeBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
  background: ${p =>
    p.$type === 'MULTI_CHOICE'    ? '#eff6ff' :
    p.$type === 'FILL_BLANKS'     ? '#f0fdf4' :
    p.$type === 'DETAILED_ANSWER' ? '#fdf4ff' :
    p.$type === 'TRUE_FALSE'      ? '#fff7ed' : '#f5f3ff'};
  color: ${p =>
    p.$type === 'MULTI_CHOICE'    ? '#2563eb' :
    p.$type === 'FILL_BLANKS'     ? '#16a34a' :
    p.$type === 'DETAILED_ANSWER' ? '#9333ea' :
    p.$type === 'TRUE_FALSE'      ? '#ea580c' : '#7c3aed'};
`

export const DiffBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
  background: ${p => p.$lvl <= 2 ? '#f0fdf4' : p.$lvl === 3 ? '#fffbeb' : '#fef2f2'};
  color:       ${p => p.$lvl <= 2 ? '#16a34a' : p.$lvl === 3 ? '#d97706' : '#dc2626'};
`

export const QuestionText = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  color: #1a1d2e;
  margin-bottom: 26px;
`

export const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const optSelected = css`
  border-color: #6366f1;
  background: #f5f3ff;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  .opt-letter { background: #6366f1; color: #fff; border-color: #6366f1; }
`

export const OptionBox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 14px 18px;
  border-radius: 13px;
  border: 1.5px solid ${p => p.$selected ? '#6366f1' : '#e4e8f0'};
  background: ${p => p.$selected ? '#f5f3ff' : '#fafbff'};
  box-shadow: ${p => p.$selected ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none'};
  cursor: pointer;
  transition: all 0.18s;
  &:hover { border-color: #a5b4fc; background: #f8f7ff; }
  input { display: none; }
  .opt-letter {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1.5px solid ${p => p.$selected ? '#6366f1' : '#d1d5db'};
    background: ${p => p.$selected ? '#6366f1' : '#fff'};
    color: ${p => p.$selected ? '#fff' : '#6b7280'};
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0;
    transition: all 0.18s;
  }
  .opt-text { font-size: 15px; color: #374151; line-height: 1.5; padding-top: 4px; font-weight: ${p => p.$selected ? '600' : '400'}; }
`

export const FreeTextInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid #e4e8f0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  color: #1a1d2e;
  background: #fafbff;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  &::placeholder { color: #9ca3af; }
`

export const FreeTextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid #e4e8f0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  color: #1a1d2e;
  background: #fafbff;
  outline: none;
  resize: vertical;
  min-height: 140px;
  transition: border-color 0.2s;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  &::placeholder { color: #9ca3af; }
`

// ─── Bottom action bar ────────────────────────────────────────────────────────
export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e4e8f0;
  padding: 14px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  flex-wrap: wrap;
  gap: 12px;
`

export const NavBtn = styled.button`
  display: flex; align-items: center; gap: 7px;
  padding: 10px 22px;
  border-radius: 11px;
  border: 1.5px solid ${p => p.$primary ? '#6366f1' : '#e4e8f0'};
  background: ${p => p.$primary ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#fff'};
  color: ${p => p.$primary ? '#fff' : '#374151'};
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${p => p.$primary ? '0 4px 14px rgba(99,102,241,0.35)' : '0 2px 8px rgba(0,0,0,0.08)'};
  }
  &:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
`

export const ReviewBtn = styled.button`
  display: flex; align-items: center; gap: 6px;
  padding: 9px 18px;
  border-radius: 11px;
  border: 1.5px solid ${p => p.$active ? '#f59e0b' : '#e4e8f0'};
  background: ${p => p.$active ? '#fffbeb' : '#fff'};
  color: ${p => p.$active ? '#d97706' : '#6b7280'};
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
  &:hover { border-color: #f59e0b; background: #fffbeb; color: #d97706; }
`

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 80px;
`

export const SideCard = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e4e8f0;
  padding: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
`

export const SideTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 14px;
`

// ─── Palette grid ─────────────────────────────────────────────────────────────
export const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 7px;
`

export const PaletteBtn = styled.button`
  aspect-ratio: 1;
  border-radius: 9px;
  border: 2px solid transparent;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  transition: all 0.15s;
  position: relative;

  /* unattempted */
  ${p => p.$status === 'unattempted' && css`
    background: #f3f4f6; color: #6b7280; border-color: #e5e7eb;
  `}
  /* visited */
  ${p => p.$status === 'visited' && css`
    background: #fee2e2; color: #dc2626; border-color: #fca5a5;
  `}
  /* answered */
  ${p => p.$status === 'answered' && css`
    background: #dcfce7; color: #16a34a; border-color: #86efac;
  `}
  /* review */
  ${p => p.$status === 'review' && css`
    background: #fef3c7; color: #d97706; border-color: #fcd34d;
  `}
  /* review + answered */
  ${p => p.$status === 'review-answered' && css`
    background: linear-gradient(135deg,#fef3c7 50%,#dcfce7 50%);
    color: #d97706; border-color: #fcd34d;
  `}

  /* current */
  ${p => p.$current && css`
    box-shadow: 0 0 0 3px rgba(99,102,241,0.45);
    border-color: #6366f1 !important;
    transform: scale(1.08);
  `}

  &:hover { transform: scale(1.1); }
`

// ─── Legend ───────────────────────────────────────────────────────────────────
export const Legend = styled.div`
  display: flex; flex-direction: column; gap: 8px;
`
export const LegendRow = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: #6b7280;
`
export const LegendDot = styled.div`
  width: 14px; height: 14px; border-radius: 4px; flex-shrink: 0;
  background: ${p => p.$bg};
  border: 1.5px solid ${p => p.$border};
`

// ─── Stats row ────────────────────────────────────────────────────────────────
export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
export const StatBox = styled.div`
  background: ${p => p.$bg || '#f8faff'};
  border: 1px solid ${p => p.$border || '#e4e8f0'};
  border-radius: 11px;
  padding: 10px 12px;
  text-align: center;
`

export const StatVal = styled.div`
  font-size: 20px; font-weight: 700; color: ${p => p.$color || '#1a1d2e'};
  font-family: 'Fira Code', monospace;
`
export const StatLabel = styled.div`
  font-size: 10px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.07em; color: #9ca3af; margin-top: 2px;
`


export const LoadWrap = styled.div`
  display: flex; align-items: center; justify-content: center;
  min-height: 300px; flex-direction: column; gap: 14px;
`
export const Spinner = styled.div`
  width: 36px; height: 36px;
  border: 3px solid #e4e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: ${keyframes`to{transform:rotate(360deg)}`} 0.7s linear infinite;
`