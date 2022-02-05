import {EmailOutlined} from "@material-ui/icons"
import { Container, Grid, IconButton, Typography, makeStyles } from "@material-ui/core"

const toUrl = (string) => {
    return string.trim().replace(/\s/g, '%20')
}

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.secondary.main,
        margin: 0,
    },
    grid: {
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'center'
    },
    icon: {
        fontSize: 60,
        color: theme.palette.primary.main
    },
    type: {
        marginTop: 'auto',
        marginBottom: 'auto',
    }
}))

export const ContactInfo = () => {
    const classes = useStyles()
    const handleClick = () => {
        const subject = toUrl("Blue Collar Homeschool Question")
        const body = toUrl("I have a question about ... ")
        const mailTo = "cindy@bluecollarhomeschool.com"
        window.open(`mailto:${mailTo}?subject=${subject}&body=${body}`)
    }
    return(
        <div className={classes.container}>
            <Grid className={classes.grid}>
                <Typography variant="h4" color="textSecondary" className={classes.type}>Contact Us</Typography>
                <IconButton onClick={handleClick}>
                    <EmailOutlined className={classes.icon}/>
                </IconButton>
            </Grid>
        </div>
    )
}

export default ContactInfo