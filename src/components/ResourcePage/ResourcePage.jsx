import { Typography, Grid, Container, Button,CardMedia, makeStyles, Tooltip } from "@material-ui/core"
import { getGradeLevel } from "../../utils"
import { getImage, maybe } from "../../misc"
import { useResourceQuery } from "../../views/Resource/queries"
import {CheckCircle, Cancel} from "@material-ui/icons"
import Loading from "../Loading"
import DefaultImage from "../DefaultImage"
import { resourcesPath } from "../../views/Resources/urls"
import useNavigator from '../../hooks/useNavigator'
import { ResourceAttribute } from "./ResourceAttribute"
import DescriptionJson from "../DescriptionJson/DescriptionJson"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(450px, 1fr) 1fr 1fr',
    gridTemplateRows: 'minmax(150px, auto) 300px auto',
    width: '100%',
    maxWidth: 1600,
    margin: 'auto',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(16),
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: 'minmax(300px, 325px) 1fr 160px',
      gridTemplateRows: 'minmax(150px, auto) 150px auto',
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
      gridTemplateColumns: '300px 1fr',
      gridTemplateRows: 'minmax(150px, auto) 300px minmax(300px, 400px) 350px auto',
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'minmax(150px, auto) 250px auto auto auto',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'minmax(450px, 500px) 1fr 160px',
      gridTemplateRows: 'minmax(150px, auto) 300px auto',
    }
  },
  img: {
    [theme.breakpoints.down("lg")]: {
      gridColumn: 1,
      gridRow: '1 / 3',
      width: 300,
      height: 300,
    },
    [theme.breakpoints.down("sm")]: {
      gridColumn: 1,
      gridRow: 2,
      width: 300,
      height: 300,
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 2,
      width: 250,
      height: 250,
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: 1,
      gridRow: '1 / 3',
      width: 450,
      height: 450,
    },


  },
  attrs: {
    gridColumn: 1,
    gridRow: '3 /-1',
    display: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.down("lg")]: {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    [theme.breakpoints.down("sm")]: {
      gridRow: 4,
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 5
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },

  },
  tnT: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 2
  },
  iconGreen: {
    color: theme.palette.green
  },
  iconRed: {
    color: theme.palette.accent.red
  },
  text: {
    color: theme.palette.text.main,
    fontFamily: "Roboto",
    maxWidth: '60ch',
    gridColumn: 2,
    gridRow: '2 / -1',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 'none',
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 3,
      marginLeft: theme.spacing(0),
    },
  },
  affiliates: {
    gridRow: 2,
    gridColumn: 3,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      gridRow: 3,
      gridColumn: 1,
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 4
    },
  },
  header: {
    gridColumn: '2 / -1',
    gridRow: '1',
    [theme.breakpoints.down("sm")]: {
      gridColumn: '1 / -1',
      margin: 'auto'
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 1,
      textAlign: 'center'
    },
  },
  headerDetails: {
    maxWidth: 600,
    justifyContent: "space-evenly",
    flexFlow: "row  nowrap",
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    }
  },
  headerItem: {
    margin: 4
  },
  affiliateBtn: {
    width: 120,
    borderRadius: 0,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}))

export const ResourcePage = (props) => {
  const {
    id
  } = props
  const {data, loading} = useResourceQuery({
    variables: {
      id: id
    }
  })
  const classes = useStyles()
  const navigator = useNavigator()
  if(loading && !data)return(<Loading/>)
  const r = maybe(() => data.resource)
  const g = getGradeLevel(r.gradeLevel)
  const image = getImage(r)
  const searchBySubject = (subjectId) => {
    const url = resourcesPath + "?subject=" + encodeURIComponent(subjectId)
    navigator(url)
  }
  const searchByPublisher = (publisherId) => {
    const url = resourcesPath + "?publishers=" + encodeURIComponent(publisherId)
    navigator(url)
  }
  const searchByGrade = (gradeLevel) => {
    const url = resourcesPath + "?gradeLevel=" + encodeURIComponent(gradeLevel)
    navigator(url)
  }

  return (
    <Grid className={classes.root}>
      <Container className={classes.img}>
      {image?
        <CardMedia
        src={image}
        component="img"
        />
        :
        <DefaultImage
          variant={true}
          item={r}
        />
      }
      </Container>
      <Container className={classes.attrs}>
      <ResourceAttribute
        attribute="Subject"
        name={r.subject.name}
        id={r.subject.id}
        onClick={searchBySubject}
      />
      <ResourceAttribute
        attribute="Publisher"
        name={r.publisher.name}
        id={r.publisher.id}
        onClick={searchByPublisher}
      />
      <ResourceAttribute
        attribute="Grade"
        name={g.name.full}
        id={r.gradeLevel}
        onClick={searchByGrade}
      />
      </Container>



      <Grid className={classes.header}>
      {/* <Typography variant="h1" color="secondary">{r.name}</Typography> */}
      <Typography variant="h1" color="secondary">Your Business Math (Charlotte Mason Style)</Typography>

        <Grid container className={classes.headerDetails}>
          <div className={classes.tnT} >
            <Typography variant="body2" color="primary">Tried & True?:</Typography>
            {r.triedAndTrue?
            <Tooltip title={
              <Typography variant='body1' color='textSecondary'>Cindy has used this material in the classroom</Typography>}>
              <CheckCircle className={classes.iconGreen}/>
            </Tooltip>:
            <Tooltip title={
              <Typography variant='body1' color='textSecondary'>Cindy has not used this material in the classroom</Typography>
            }>
              <Cancel className={classes.iconRed}/>
            </Tooltip>
            }
            </div>
            <Typography variant="body2" color="primary" className={classes.headerItem}>{r.publisher.name}</Typography>
            <Typography variant="body2" color="primary" className={classes.headerItem}>{g.name.short}</Typography>

        </Grid>
      </Grid>
      <Container className={classes.text}>
        <DescriptionJson descriptionJson={r.descriptionJson}/>
      </Container>

      <Grid className={classes.affiliates} container>
          <Typography variant='body2' align="left">Affiliate Links</Typography>
          <Tooltip title={
            <Typography variant='body2' color="textSecondary">This link will take you outside of {window.location.hostname}</Typography>
          }>
          <Button variant="containedPrimary" onClick={()=>{window.open(r.externalLink)}}
          className={classes.affiliateBtn}
          >Visit Website</Button>
          </Tooltip>
          {/* <div dangerouslySetInnerHTML={ {__html: r.amazonAffiliateLink} }/> */}
      </Grid>
    </Grid>
  )
}

export default ResourcePage
