import React from "react"
import dayjs from "dayjs"
import customParseFormat  from "dayjs/plugin/customParseFormat"
import useForm from "../../hooks/useForm";
import useMessages from "../../hooks/useMessages"
import { PronounToIntStr } from "../../utils";

const getInitialData = (certificate) => {
    return({
        presentedFor: certificate?.presentedFor || "",
        presentedTo: certificate?.presentedTo || "",
        presentedOn: certificate?.presentedOn || "",
        presentedBy: certificate?.presentedBy || "",

        streetAddress1: certificate?.streetAddress1 || "",
        streetAddress2: certificate?.streetAddress2 || "",
        postalCode: certificate?.postalCode || "",
        city: certificate?.city || "",
        state: certificate?.state || "",
        country: certificate?.country || "",

        email:  certificate?.email || "",
        generated: certificate?.generated || false,

        digitalOnly: certificate?.digitalOnly || false,
        pronouns: certificate?.pronouns || "MALE",

    })
}

function useCertificateCreateForm(
    certificate,
    onSubmit
){
    const {addMessage} = useMessages()
    const [changed, setChanged] = React.useState(false)
    const [generated, setGenerated] = React.useState(certificate.generated || false)
    const [digitalOnly, setDigitalOnly] = React.useState(certificate.digitalOnly)
    const [pronouns, setPronouns] = React.useState(certificate.pronouns)
    const GRADUATION = "GRADUATION"
    // const ACCOMPLISHMENT = "ACCOMPLISHMENT"
    const [cType, setCType] = React.useState(GRADUATION)
    const triggerChange = () => setChanged(true);

    const form = useForm(
        getInitialData(certificate)
    )

    const handleChange = (event, cb) =>{
        form.change(event, cb);
        if(!changed){
            triggerChange()
        }

    }

    const toggleGenerated = (e) => {
        setGenerated(!generated)
        handleChange(e)
    }

    const togglePronouns = (e) => {
        setPronouns(e.target.value)
        handleChange(e)
    }

    const toggleDigitalOnly = (e) => {
        setDigitalOnly(!digitalOnly)
        handleChange(e)
    }

    const changeCertificateType = (e) => {
        setCType(e.target.value)
        handleChange(e)
    }

    const validate = (data) => {
        const re = /[0-9]{4}-[0-9]{2}-[0-9]{2}/
        const regex = new RegExp(re)
        if(regex.test(data.presentedOn)){
            dayjs.extend(customParseFormat)
            if(dayjs(data.presentedOn, "YYYY-MM-DD", true).isValid()){
                return true
            } else {
                addMessage({
                    text: `Correct date format, but invalid date: ${data.presentedOn}`,
                    messageType: "error"
                })
            }
        } else {
            addMessage({
                text: "Presented On date needs to be in format YYYY-MM-DD",
                messageType: "error"
            })
        }
        return false
    }


    const data = {
        ...form.data,
        generated: generated,
        digitalOnly: digitalOnly,
        pronouns: pronouns
    };
    const submitData = {
        ...data,
        generated: generated,
        digitalOnly: digitalOnly,
        pronouns: PronounToIntStr(pronouns)
    }

    const submit = () => {
        if(validate(submitData)){
            const pFor = submitData.presentedFor
            if(cType === GRADUATION){
                submitData.presentedFor = cType + " " + pFor
                onSubmit(submitData);
            }
            else{
                onSubmit(submitData);
            }
            setChanged(false)
        }
    }
    return({
        change: handleChange,
        data,
        handlers: {
            toggleGenerated,
            changeCertificateType,
            toggleDigitalOnly,
            togglePronouns
        },
        hasChanged: changed,
        submit,
        cType
    })

}


const CertificateCreateForm = ({
    children,
    certificate,
    onSubmit,

}) => {
    const props = useCertificateCreateForm(certificate, onSubmit)
    return <form onSubmit={props.submit}>{children(props)}</form>;
}

export default CertificateCreateForm