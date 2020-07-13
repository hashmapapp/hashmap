import { createGlobalStyle } from 'styled-components';
import { DARK } from './colors';

export default createGlobalStyle`

  /* @font-face {
    font-family: 'Open Sans Regular';
    src: url('/fonts/OpenSans-Regular.ttf');
  }

  @font-face {
    font-family: 'Open Sans Bold';
    src: url('/fonts/OpenSans-Bold.ttf');
  }

  @font-face {
    font-family: 'Open Sans ExtraBold';
    src: url('/fonts/OpenSans-ExtraBold.ttf');
  }

  @font-face {
    font-family: 'Open Sans Light';
    src: url('/fonts/OpenSans-Light.ttf');
  } */

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    min-height: 100%;
    height:100%;
  }
  
  body {
    -webkit-font-smoothing: antialiased !important;
  }
  
  body, input, button {
    /* color: ${DARK};
    font-size: 14px; */
    outline: none;
  }
  
  button {
    cursor: pointer;
  }

  p, span, li {
    /* font-family: 'Open Sans Regular', sans-serif; */
    /* font-size: 1.2em;
    white-space: pre-line; */
  }

  h1, h2, h3, h4, h5, h6 {
    /* font-family: 'Open Sans Bold', sans-serif; */
  }

`;
