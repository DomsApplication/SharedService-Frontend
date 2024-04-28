// ==============================|| PRESET ColorGenerator - ColorGenerator SELECTOR ||============================== //
// https://2x.ant.design/docs/spec/colors#Color-Palettes
// preset palettes from ant-design/colors
// Ant Design provides a set of preset color palettes that consist of 10 shallow-to-deep color swatches. Each swatch is generated using a combination of color plus Bezier curves and different rotation angles for cold and warm colors. The default ColorGenerator of Ant Design includes eight basic colors, with each color being derived from the above algorithm.
// Here are the 10 default color palettes provided by Ant Design, along with their hex codes:

// Red: #F5222D, #E84C3D, #D03F35, #C0322B, #AA2820, #8C1F14, #74160D, #590E08, #3D0300, #1C0000
// Volcano: #FA541C, #F04810, #E63F0B, #D83308, #CA2A07, #B42105, #9C1702, #840E00, #6A0600, #4D0000
// Orange: #FA8C16, #F6740F, #E66309, #D95606, #CA4503, #B43301, #9C2000, #840A00, #6A0700, #4D0100
// Gold: #BAA015, #A68F0B, #8C7408, #7A5E05, #654603, #4E3101, #361B00, #210A00, #0B0500, #000100
// Lime: #A0D911, #8DBF0A, #6B9B05, #537E03, #3E6301, #2A4900, #152F00, #061500, #000A00, #000400
// Green: #52C41A, #44B70D, #2F9A07, #1C7E04, #0F5F02, #023400, #000D00, #000800, #000400, #000100
// Cyan: #13C2C2, #0BBCC0, #00B2C6, #009CCC, #008EE2, #007EC0, #0069B4, #0052A7, #003C9A, #00278C
// Blue: #2F54EB, #233DE3, #1922D2, #0F15CA, #0509B4, #0006A7, #00059A, #00048D, #000381, #000275
// Geekblue: #242A70, #1D216B, #161A62, #0F1359, #090B4E, #030843, #000539, #00032F, #000225, #00011B
// Purple: #7E57C2, #704EC0, #6245C6, #553CB3, #4732AE, #3A28A4, #2D1EA8, #1F159E, #100C94, #06068A
const ColorGenerator = (colors) => {
  const { blue, red, gold, cyan, green, grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };
  const contrastText = "#fff";

  return {
    primary: {
      lighter: blue[0],
      100: blue[1],
      200: blue[2],
      light: blue[3],
      400: blue[4],
      main: blue[5],
      dark: blue[6],
      700: blue[7],
      darker: blue[8],
      900: blue[9],
      contrastText,
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500],
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0],
    },
    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      darker: red[9],
      contrastText,
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100],
    },
    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText,
    },
    success: {
      lighter: green[0],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText,
    },
    grey: greyColors,
  };
};

export default ColorGenerator;
