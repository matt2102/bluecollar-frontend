import bnht from "../../assets/media/aboutcontent/bnht.webp"
import college from "../../assets/media/aboutcontent/college.webp"
import trainup from "../../assets/media/aboutcontent/trainup.webp"
import learningtangent from "../../assets/media/aboutcontent/learningtangent.webp"

import sanityshow from "../../assets/media/aboutcontent/sanityshow.webp"
import orphans from "../../assets/media/aboutcontent/orphans.webp"
import hamster from "../../assets/media/aboutcontent/hamster.webp"
import fasdsuccess from "../../assets/media/aboutcontent/fasdsuccess.webp"
import fasdinformed from "../../assets/media/aboutcontent/fasdinformed.webp"
import fasdhope from "../../assets/media/aboutcontent/fasdhope.webp"
import adoptivemommas from "../../assets/media/aboutcontent/2adpotivemommas.webp"
import empowering from "../../assets/media/aboutcontent/empowering.webp"
import solutions from "../../assets/media/aboutcontent/solutions.webp"
import lifeskills from "../../assets/media/aboutcontent/lifeskills.webp"
import schoolhouserocked from "../../assets/media/aboutcontent/schoolhouserocked.webp"
import similinghomeschooler from "../../assets/media/aboutcontent/similinghomeschooler.webp"
import fasd from "../../assets/media/aboutcontent/fasd.webp"



import {AboutPageContent} from "../../content"
import AboutCard from "../AboutCard"
import { Grid, Container, makeStyles, Typography } from "@material-ui/core"


const imgMap = {
    "bnht.webp": bnht,
    "college.webp": college,
    "trainup.webp": trainup,
    "learningtangent.webp": learningtangent,
    "sanityshow.webp": sanityshow,
    "orphans.webp": orphans,
    "hamster.webp": hamster,
    "fasdsuccess.webp": fasdsuccess,
    "fasdinformed.webp": fasdinformed,
    "fasdhope.webp": fasdhope,
    "2adpotivemommas.webp": adoptivemommas,
    "empowering.webp": empowering,
    "solutions.webp": solutions,
    "lifeskills.webp": lifeskills,
    "schoolhouserocked.webp": schoolhouserocked,
    "similinghomeschooler.webp": similinghomeschooler,
    "fasd.webp": fasd,
}

const useStyles = makeStyles(theme => ({
    grid: {
        display: "grid",
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        rowGap: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: '1fr'
        }

    },
    title: {
        gridColumn: '1 / -1',
        gridRow: 1,
        marginTop: theme.spacing(4)
    }
}))


export const AboutCardContainer = () => {
    const classes = useStyles()
    return(
        <Grid className={classes.grid}>
            <Container className={classes.title}>
                <Typography variant="subtitle1" >Work</Typography>
            </Container>
            {AboutPageContent.map(edge => {
                const data = {
                    ...edge,
                    img: imgMap[edge.imgName] || null
                }
                return(
                    <Container>
                        <AboutCard {...data}/>
                    </Container>
                )
            })}
        </Grid>
    )
}