import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'Pretendard-Medium';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'Pretendard-SemiBold';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'Pretendard-Bold';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
    font-family: 'Gabriela';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/gabriela/v14/qkBWXvsO6sreR8E-b8m5xLs.woff2) format('woff2');
    }
    body,a,button{
        font-family: 'Pretendard';
        font-weight: 400;
        font-size:16px;
        color:#1d1d1d;
        line-height: 1.7;
        text-decoration: none;
        outline: 0;
        border:0;
        margin:0;
    }
`;

export default GlobalStyle;
