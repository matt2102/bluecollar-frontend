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


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3bb7c7',
      // dark: "#311980",
      // light: "#50b043"
    },
    secondary: {
      main: '#5A519C',
      light: '#F3F2F8'
    },
    green: '#A5C854',
    accent: {
      yellow: '#f3cc17',
      red: '#d23939'
    },
    text: {
      main: '#707070'
    }
  },
  typography: {
    allVariants:{
      color: '#707070'
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
    MuiButton: {
      containedPrimary: {
        height: '50px',
        borderRadius: '50px',
        width: '200px',
        background: "#3bb7c7",
        color: "#fafafa",
        textTransform: "none",
        boxShadow: 'none',
        '&&:hover': {
          background: '#A5C854',
          boxShadow: 'none',
        },

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