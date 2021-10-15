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

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    minHeight: '90vh'
  },
  grid: {
    width: '100%',
    maxWidth: 1600,
    display: "grid",
    gridTemplateColumns: '1fr 1fr',
    margin: 'auto',
  },
  imgContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  imgCard:{
    display: "flex",
    margin: "auto",
    width: '80%',
    background: 'none',
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr minmax(200px, 300px)",
    gridTemplateRows: "auto"
  },
  title: {
    gridColumn: "1 / -1",
    gridRow: 1,
    marginTop: 60,
    marginBottom: 60,
  },
  btnContainer: {
    gridColumn: 2,
    gridRow: 2
  },
  text: {
    gridRow: 3,
    gridColumn: 1,
    marginTop: 40,
    marginBottom: 40,
    color: theme.palette.text.secondary,
    fontFamily: "Roboto"
  }

}))

export const CourseView = () => {
  const location = useLocation()
  const {addItem, removeItem, checkout, clear} = useCheckout()
  console.log(checkout)
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
        <VariantSelector
        variants = {product.variants}
        setSelected = {setSelected}
        selected = {variantId}
        />
        <Grid className={classes.btnContainer} container direction="column">
          <Button variant="containedPrimary" onClick={()=>addItem(variantId, 1)}>Add to Cart</Button>
          <Button variant="containedPrimary" onClick={()=>removeItem(variantId)}>Remove Item</Button>
          <Button variant="containedPrimary" onClick={()=>clear()}>Clear</Button>
          {/* <Button variant="containedPrimary"
          onClick={()=>navigator(coursesPath)}
          >Keep Shopping</Button> */}
        </Grid>
        <div className={classes.text}>
          <DescriptionJson descriptionJson={product.descriptionJson}/>
        </div>
      </Grid>
    </Grid>
    </div>
  )
}

export default CourseView