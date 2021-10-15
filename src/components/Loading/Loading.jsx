import { makeStyles, Typography } from "@material-ui/core"
import ReactLoading from 'react-loading'


const useStyles = makeStyles({
  loading: {
    // minHeight: '1200px',
    height: '100vh',
    display: "flex"
  },
  container: {
    height: 300,
    width: 300,
    margin: "auto",
    display: 'flex',
    flexFlow: 'column nowrap',
    // justifyContent: 'center'
    alignItems: "center"
  },
  root: {
    width: '100wh',
    height: '90vh',
    color: '#fff',
    background: 'linear-gradient(-45deg, #5a519c, #3bb7c7, #5a519c, #5a519c)',
    backgroundSize: '400% 400%',
    '-webkit-animation': '$Gradient 15s ease infinite',
    '-moz-animation': '$Gradient 15s ease infinite',
    animation: '$Gradient 15s ease infinite',
    display: "flex"
  },
  "@-webkit-keyframes Gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
    backgroundPosition: "100% 50%",
    },
    "100%": {
    backgroundPosition: "0% 50%",
    }
  },

  '@-moz-keyframes Gradient': {
    "0%": {
      backgroundPosition: "0% 50%",
      },
    "50%": {
      backgroundPosition: "100% 50%",
      },
    "100%":  {
      backgroundPosition: "0% 50%",
      },
  },
  '@keyframes Gradient': {
    "0%": {
      backgroundPosition: "0% 50%",
      },
    "50%": {
      backgroundPosition: "100% 50%",
      },
    "100%":  {
      backgroundPosition: "0% 50%",
      }
  }

})

const loadingTypes = [
  'blank',
  'balls',
  'bars',
  'bubbles',
  'cubes',
  'cylon',
  'spin',
  'spinningBubbles',
  'spokes',
]
export const loadingSet = new Set(loadingTypes)

export default function Loading(props){
  const {
    title,
    loadingType
  } = props
  let t = 'bars'
  if(loadingSet.has(loadingType)){
    t = loadingType
  }
  const classes = useStyles()

  return(
    <div className={classes.loading}>
      <div className={classes.container}>
        <Typography variant="subtitle1" color="textMain">{title?title:'Loading'}</Typography>
        <ReactLoading type={t} height={"50%"} width={"50%"} color={"#A5C854"}/>
      </div>
    </div>
  )
}