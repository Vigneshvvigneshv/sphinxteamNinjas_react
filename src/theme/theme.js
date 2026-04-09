import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const sphinxTheme = {
  // ── Core Brand Blacks ──────────────────────────────────────────
  gold:          "#2A2A2A",          // Primary interactive black
  goldDark:      "#111111",          // Deep action / pressed
  goldDeep:      "#000000",          // True black — borders, icons
  goldLight:     "#3D3D3D",          // Hover state charcoal
  goldPale:      "#F7F7F7",          // Subtle off-white fill
  goldFocus:     "rgba(0,0,0,0.07)", // Focus ring

  // ── Surfaces ──────────────────────────────────────────────────
  surface:       "#FFFFFF",          // Cards, modals
  cream:         "#FAFAFA",          // Input backgrounds
  pageBg:        "#F3F3F3",          // Page canvas — lets white cards pop

  // ── Typography ────────────────────────────────────────────────
  textPrimary:   "#0D0D0D",          // Headlines, labels
  textSecondary: "#3A3A3A",          // Body copy
  textMuted:     "#6B6B6B",          // Captions, hints
  textHint:      "#A0A0A0",          // Placeholder, disabled
  textLight:     "#E8E8E8",          // On-dark text
  textWhite:     "#FFFFFF",          // On-black text

  // ── Borders ───────────────────────────────────────────────────
  border:        "rgba(0,0,0,0.09)",
  borderHover:   "rgba(0,0,0,0.22)",
  borderGold:    "rgba(0,0,0,0.14)",
  borderStrong:  "rgba(0,0,0,0.40)",

  // ── Gradients & Backgrounds ───────────────────────────────────
  headerBg:      "linear-gradient(135deg,#141414 0%,#000000 100%)",
  loginBg:       "linear-gradient(160deg,#FFFFFF 0%,#EFEFEF 100%)",
  formBg:        "#FFFFFF",
  buttonBg:      "linear-gradient(135deg,#3A3A3A 0%,#0D0D0D 100%)",
  progressBg:    "linear-gradient(90deg,#4A4A4A 0%,#111111 100%)",
  texture:       "none",

  // ── Shadows ───────────────────────────────────────────────────
  shadowSm:      "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
  shadowMd:      "0 4px 14px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.05)",
  shadowLg:      "0 12px 28px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.07)",
  shadowModal:   "0 24px 48px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.10)",

  // ── Semantic Colors ───────────────────────────────────────────
  danger:        "#C62828",
  dangerBg:      "#FFF5F5",
  dangerBorder:  "rgba(198,40,40,0.12)",
  success:       "#2E7D32",
  successBg:     "#F0F7F0",
  successBorder: "rgba(46,125,50,0.12)",
  warning:       "#E65100",
  warningBg:     "#FFF8F0",
  overlay:       "rgba(0,0,0,0.65)",

  // ── Typography Families ───────────────────────────────────────
  fontSans:      "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSerif:     "'EB Garamond', 'Georgia', serif",
  fontMono:      "'JetBrains Mono', 'Fira Code', monospace",

  // ── Border Radii ──────────────────────────────────────────────
  radiusSm:      "4px",
  radiusMd:      "8px",
  radiusLg:      "12px",
  radiusCard:    "14px",
  radiusFull:    "999px",

  // ── Z-index ───────────────────────────────────────────────────
  zBase:         1,
  zDropdown:     100,
  zModal:        500,
  zOverlay:      1000,
};

// ── Redux Slice ────────────────────────────────────────────────
const themeSlice = createSlice({
  name: "theme",
  initialState: sphinxTheme,
  reducers: {},
});

export const themeReducer = themeSlice.reducer;
export default themeSlice.reducer;

// ── Hook ───────────────────────────────────────────────────────
export const useTheme = () => useSelector((state) => state.theme);
