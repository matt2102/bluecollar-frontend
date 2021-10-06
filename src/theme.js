import { createMuiTheme } from "@material-ui/core/styles";
// import Lobster from "./assets/typefaces/lobster-v23-latin-regular.woff2"


// const lobster = {
//   fontFamily: "Lobster",
//   fontStyle: "normal",
//   fontDisplay: "swap",
//   fontWeight: 400,
//   src: `
//     local('Lobster'),
//     local('Lobster-Regular'),
//     url(${Lobster}) format('truetype')
//   `,
//   unicodeRange:
//   "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF UTF-8",
// };

const mainBlue = "#3bb7c7"
const mainPurple = "#5a519c"
const accountPurple = "#F3F2F8"
const mainGreen = "#A5C854"
const accentYellow = "#f3cc17"
const accentRed = "#d23939"
const text = "#707070"
const background = "#fafafa"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainBlue,
      // dark: "#311980",
      // light: "#50b043"
    },
    secondary: {
      main: mainPurple,
      light: accountPurple
    },
    green: mainGreen,
    accent: {
      yellow: accentYellow,
      red: accentRed
    },
    text: {
      main: text,
      secondary: '#FFF'
    },
    background: {
      main: background
    }
  },
  typography: {
    allVariants:{
      color: text
    },
    fontFamily: [
      // 'Lobster',
      'Roboto'
    ].join(','),
    h1: {
      fontFamily: 'Lobster',
    },
    h2: {
      fontFamily: 'Roboto'
    },
    h3: {
      fontFamily: 'Roboto',
      fontWeight: 'light'
    },
    h5: {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: 20,
      // marginBottom: 5,
      // margin: 'auto',
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: 'light'
    },
    subtitle1: {
      fontSize: 30,
    },
    subtitle2: {
      fontFamily: 'Lobster',
      fontSize: 32
    }

  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Lobster']
      }
    },
    // MuiTextField: {
    //   bchInput: {
    //     width: '100%',
    //     textIndent: '5ch',
    //     paddingLeft: '20px',
    //     background: accountPurple,
    //     height: '50px',
    //     borderRadius: 25,
    //     position: 'relative',
    //     'label + &': {
    //       marginTop: '4em',
    //     },
    //     '&.Mui-focused': {
    //       borderColor: mainBlue,
    //       border: '2px solid',
    //     },
    //   }
    // },
    MuiButton: {
      containedPrimary: {
        height: 50,
        borderRadius: '50px',
        width: '200px',
        fontWeight: 300,
        fontSize: 18,
        background: mainBlue,
        color: "#fafafa",
        textTransform: "none",
        boxShadow: 'none',
        '&&:hover': {
          background: mainGreen,
          boxShadow: 'none',
        },

      },
      containedSecondary: {
        background: mainBlue,
        height: 50,
        color: '#FFF',
        fontWeight: 300,
        fontSize: 18,
        textTransform: "none",
        borderRadius: 25,
        maxWidth: '50%',
        // margin: 'auto'
        marginLeft: '25%',
        '&:hover':{
          background: '#A5C854',
          color: text
        },
        '&:disabled':{
          background: "#311980",
          // cursor: 'not-allowed'
        }
      }
    },
    MuiInput: {
      underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&&:after": {
            borderBottom: "none"
        }
    }
    }
  }
})

export default theme