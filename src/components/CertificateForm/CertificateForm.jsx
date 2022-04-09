import { Grid, Typography, MenuItem, makeStyles, Button, FormControl, InputLabel, Select } from "@material-ui/core"
import React from "react"
import AccountButton from "../AccountButton/AccountButton"
import CertificateCreateForm from "./form"

const GRADUATION = "GRADUATION"
const ACCOMPLISHMENT = "ACCOMPLISHMENT"

const useStyles = makeStyles(theme => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: '4px 1fr 4px',
        // gridTemplateRows: '300px auto',
        gridAutoRows: 'auto',
        rowGap: theme.spacing(3),
        marginBottom: theme.spacing(10)
    },
    title: {
        gridColumn: '1 / -1',
        gridRow: 1,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6)
    },
    formControl: {
        width: '100%',
        gridColumn: 2,
        // gridRow: 2
    },
    formInputLabel: {
        fontSize: 28,
        [theme.breakpoints.down("md")]: {
            fontSize: 20,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 18,
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: 28,
        }
    },
    formSelect: {
        width: '100%',
        paddingLeft: '20px',
        background: theme.palette.secondary.light,
        height: '50px',
        borderRadius: 25,
        position: 'relative',
        'label + &': {
          marginTop: theme.spacing(4),
        },
        '&.Mui-focused': {
          borderColor: theme.palette.primary.main,
          border: '2px solid',
        },
    },
    submitBtn: {
        gridColumn: 2,
        // gridRow: 0,
        background: theme.palette.primary.main,
        height: 50,
        color: theme.palette.background.default,
        fontWeight: 400,
        fontSize: 20,
        textTransform: "none",
        borderRadius: 25,
        maxWidth: 300,

        margin: 'auto',
        // marginLeft: '25%',
        '&:hover':{
          background: theme.palette.green
        },
        '&:disabled':{
          background: theme.palette.primary.dark,
          // cursor: 'not-allowed'
        }
      }
}))

export const CertificateForm = (props) => {
    const {
        certificate,
        onSubmit,
        disabled
    } = props
    const classes = useStyles()
    return(
        <CertificateCreateForm onSubmit={onSubmit} certificate={certificate}>
            {({data, change, submit, hasChanged, handlers, cType}) => {
                const title = cType[0] + cType.slice(1).toLocaleLowerCase()
                return(
                    <Grid className={classes.grid}>
                        {
                            cType === GRADUATION ?
                            <Typography variant="h3" className={classes.title}>{title} Recognition Certificate Request</Typography>
                            :
                            <Typography variant="h3" className={classes.title}>{title} Certificate Request</Typography>
                        }

                        <FormControl className={classes.formControl} key="certificate-type">
                            <InputLabel shrink className={classes.formInputLabel}>Certificate Type</InputLabel>
                            <Select className={classes.formSelect} value={cType} onChange={handlers.changeCertificateType}>
                                <MenuItem value={GRADUATION}>Graduation</MenuItem>
                                <MenuItem value={ACCOMPLISHMENT}>Accomplishment</MenuItem>
                            </Select>
                        </FormControl>

                        {
                            cType === GRADUATION ?
                            <AccountButton label="School Name" data={data} name={'presentedFor'} onChange={change} disabled={disabled}
                            placeholder="Homeschooled"/>
                            :
                            <AccountButton label="Accomplishment" data={data} name={'presentedFor'} onChange={change} disabled={disabled}
                            placeholder="Started a small business"/>
                        }
                        <AccountButton label="Presented To (Student's Name)" data={data} name={'presentedTo'} onChange={change} disabled={disabled}/>

                        <FormControl className={classes.formControl} key="pronouns">
                            <InputLabel shrink className={classes.formInputLabel}>Student Gender</InputLabel>
                            <Select className={classes.formSelect} value={data.pronouns} onChange={handlers.togglePronouns}>
                                <MenuItem value={'MALE'}>Male</MenuItem>
                                <MenuItem value={'FEMALE'}>Female</MenuItem>
                            </Select>
                        </FormControl>

                        <AccountButton label="Parent's Name(s)" data={data} name={'presentedBy'} onChange={change} disabled={disabled}/>
                        <AccountButton label="Presented On" data={data} name={'presentedOn'} onChange={change} disabled={disabled}
                        placeholder="YYYY-MM-DD"
                        />


                        <AccountButton label="Street Address 1" data={data} name={'streetAddress1'} onChange={change} disabled={disabled}/>
                        <AccountButton label="Street Address 2" data={data} name={'streetAddress2'} onChange={change} disabled={disabled}
                        placeholder="Apt 1"/>
                        <AccountButton label="City" data={data} name={'city'} onChange={change} disabled={disabled}/>
                        <AccountButton label="State" data={data} name={'state'} onChange={change} disabled={disabled}/>
                        <AccountButton label="Zipcode / Postal Code" data={data} name={'postalCode'} onChange={change} disabled={disabled}/>
                        <AccountButton label="Country" data={data} name={'country'} onChange={change} disabled={disabled}
                        placeholder="USA"/>

                        <AccountButton label="Email" data={data} name={'email'} onChange={change} disabled={disabled}
                        placeholder="email@example.com"
                        />

                        <FormControl className={classes.formControl} key="digitalOnly">
                            <InputLabel shrink className={classes.formInputLabel}>Certificate Method of Delivery</InputLabel>
                            <Select className={classes.formSelect} value={data.digitalOnly} onChange={handlers.toggleDigitalOnly}>
                                <MenuItem value={false}>Mail (USPS)</MenuItem>
                                <MenuItem value={true}>Email</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            className={classes.submitBtn}
                            onClick={submit}
                            disabled={(disabled || !hasChanged)}
                            >{"Request Certificate"}
                        </Button>
                    </Grid>
                )
            }}
        </CertificateCreateForm>
    )
}

export default CertificateForm