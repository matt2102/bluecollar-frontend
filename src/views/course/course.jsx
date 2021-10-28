import { useLocation } from "react-router";
import { parse as parseQs } from "qs";
import { useProductDetails } from "./queries";
import useMessages from "../../hooks/useMessages";
import useNavigator from "../../hooks/useNavigator";
import { coursesPath } from "../Courses/urls";
import Loading from "../../components/Loading";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  makeStyles,
  Button
 } from "@material-ui/core";
import { maybe } from "../../misc";
import DefaultImage from "../../components/DefaultImage";
import DescriptionJson from "../../components/DescriptionJson/DescriptionJson";
import VariantSelector from "../../components/VariantSelector/VariantSelector";
import {useState} from "react"
import useCheckout from "../../hooks/useCheckout";
import TrueNorthCard from "../../components/TrueNorthCard/TrueNorthCard";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    minHeight: '90vh'
  },
  grid: {
    width: '100%',
    maxWidth: 1600,
    display: "grid",
    margin: 'auto',
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: '200px 1fr',
      columnGap: theme.spacing(4)
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '200px 1fr',
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '200px 1fr',
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  imgContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  imgCard:{
    background: 'none',
    display: "flex",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      height: 200,
      width: 200
    },
    [theme.breakpoints.up("lg")]: {
      width: '80%',
    },
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr minmax(200px, 300px)",
    gridTemplateRows: "auto",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(4, auto)'
    },
  },
  title: {
    gridColumn: "1 / -1",
    gridRow: 1,
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      margin: 'auto',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
    },
  },
  btnContainer: {
    gridColumn: 2,
    gridRow: 2,
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 3
    },
  },
  text: {
    gridRow: 3,
    gridColumn: 1,
    marginTop: 40,
    marginBottom: 40,
    color: theme.palette.text.secondary,
    fontFamily: "Roboto",
    [theme.breakpoints.down("sm")]: {
      gridRow: 3,
      gridColumn: '1/ -1',
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 4
    },
    [theme.breakpoints.up("lg")]: {
      gridRow: 3,
      gridColumn: 1,
    },
  },
  variantSelector: {
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 2
    },
  },


}))

export const CourseView = () => {
  const location = useLocation()
  const {addItem} = useCheckout()
  const [variantId, setSelected] = useState()
  const qs = parseQs(location.search.substr(1));
  const {addMessage} = useMessages()
  const navigator = useNavigator()
  const classes = useStyles()
  if(!qs.id){
    addMessage({
      type: "error",
      text: "Product Not Found"
    })
    navigator(coursesPath)
  }
  const {data, loading} = useProductDetails({
    variables: {id: qs.id}
  })
  if(loading)return(<Loading/>)
  const image = maybe(() => data.product.images[0].url, "")
  const product = data.product
  const hasVariants = data.product.variants.length > 0
  const isTrueNorth = product.externalPurchaseUrl.indexOf("truenorthhomeschoolacademy") > 0
  return(
    <div className={classes.root}>
    <Grid className={classes.grid}>
      <Container
      className={classes.imgContainer}
       container>
        <Card
          elevation={0}
          className={classes.imgCard}
        >
          {image?
            <CardMedia
            src={image}
            component="img"
            />
            :
            <DefaultImage
              variant={true}
              item={product}
            />
          }
        </Card>
      </Container>
      <Grid className={classes.detailsGrid}>
        <Typography variant="h1" color="textSecondary" className={classes.title}>{product.name}</Typography>

        {hasVariants && !product.externalPurchase?
        <Container className={classes.variantSelector}>
        <VariantSelector
        variants = {product.variants}
        setSelected = {setSelected}
        selected = {variantId}
        />
        </Container>:null
        }
        {isTrueNorth?
        <TrueNorthCard/>:null}
        {product.descriptionJson?
        <Container className={classes.text}>
          <DescriptionJson descriptionJson={product.descriptionJson}/>
        </Container>
        :null}

        <Grid className={classes.btnContainer} container direction="column">
          {product.externalPurchase?
            <Container>
            <Button variant="containedPrimary" onClick={()=>window.open(product.externalPurchaseUrl)}>Purchase</Button>
            <Typography variant="body2" color="textSecondary">This course is not hosted on Blue Collar Homeschool.  Clicking this button will take you to a different site</Typography>
            <Button variant="containedPrimary"
            onClick={()=>navigator(coursesPath)}
            >Keep Shopping</Button>
            </Container>
            :
            <Container>
            <Button variant="containedPrimary" onClick={()=>addItem(variantId, 1)}>Add to Cart</Button>
            <Button variant="containedPrimary"
            onClick={()=>navigator(coursesPath)}
            >Keep Shopping</Button>
          </Container>
          }
        </Grid>
      </Grid>
    </Grid>
    </div>
  )
}

export default CourseView