import {
    CardContent,
    Card,
    CardMedia,
    CardActionArea,
    CardHeader,
    IconButton,
} from "@material-ui/core"
import {LinkRounded} from "@material-ui/icons"


export const AboutCard = (props) => {
    const {
        img,
        link,
        title
    } = props
    const onClick = () => {
        if(link){
            window.open(link)
        }
    }
    return(
        <Card elevation={2} color="primary">
            <CardHeader
                title={title}
                action={
                <IconButton onClick={onClick}>
                    <LinkRounded/>
                </IconButton>
                }
            />
            {img?
            <CardActionArea>
                <CardContent>

                    <CardMedia
                        onClick={onClick}
                        image={img}
                        component='img'
                    />

                </CardContent>
            </CardActionArea>
            :
            null}
        </Card>
    )
}

export default AboutCard