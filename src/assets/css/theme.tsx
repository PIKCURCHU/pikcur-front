import { createTheme } from "@mui/material/styles";

/** 공통 Table 컴포넌트
 * 
 * 전역 폰트 적용을 위한 MUI 테마 설정
 * MUI는 ThemeProvider를 통해 테마를 적용할 수 있음
 * 그렇지 않으면 index.css에서 폰트 설정만 해줘도 됨
 */
const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif", // 전역 폰트
  },
});

export default theme;