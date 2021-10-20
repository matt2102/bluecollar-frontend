import { createMuiTheme } from "@material-ui/core/styles";


export const mainBlue = "#3bb7c7"
export const mainPurple = "#5a519c"
export const accountPurple = "#F3F2F8"
export const mainGreen = "#A5C854"
export const accentYellow = "#f3cc17"
export const accentRed = "#d23939"
export const text = "#707070"
export const background = "#fafafa"
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
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

    // 10px = 0.625rem
    // 12px = 0.75rem
    // 14px = 0.875rem
    // 16px = 1rem (base)
    // 18px = 1.125rem
    // 20px = 1.25rem
    // 24px = 1.5rem
    // 30px = 1.875rem
    // 32px = 2rem
    // 34px = 2.125rem
    // 36px = 2.25rem
    // 38px = 2.375rem
    // 40px = 2.5rem

    h1: {
      // 6rem
      fontSize: '6rem',
      fontFamily: 'Lobster',
      '@media (max-width:900px)': {
        fontSize: '5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '4rem',
      },
      '@media (max-width:450px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontFamily: 'Roboto'
    },
    h3: {
      // 3rem
      fontSize: "3rem",
      fontFamily: 'Roboto',
      fontWeight: 'light',
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
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
      // These work but the console yells at for for using them
      containedPrimary: {
        height: 50,
        borderRadius: 50,
        width: 200,
        fontWeight: 300,
        fontSize: '1.125rem',
        background: mainBlue,
        color: "#fafafa",
        textTransform: "none",
        boxShadow: 'none',
        margin: 10,
        '&&:hover': {
          background: mainGreen,
          boxShadow: 'none',
        },

        '&&:disabled': {
          background: text
        },
        '@media (max-width:900px)': {
          height: 40,
          borderRadius: 40,
          width: 180,
          fontSize: '1rem',
        },
        '@media (max-width:600px)': {
          height: 35,
          borderRadius: 35,
          width: 170,
          fontSize: '0.875rem',
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
      },
      textPrimary: {
        height: '50px',
        borderRadius: '50px',
        width: '200px',
        background: mainBlue,
        color: background,
        '&:hover': {
          background: mainGreen
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