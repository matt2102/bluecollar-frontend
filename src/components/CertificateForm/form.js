import React from "react"
import useForm from "../../hooks/useForm";

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
        generated: certificate?.generated || false
    })
}

function useCertificateCreateForm(
    certificate,
    onSubmit
){
    const [changed, setChanged] = React.useState(false)
    const [generated, setGenerated] = React.useState(certificate.generated || false)
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
    const changeCertificateType = (e) => {
        setCType(e.target.value)
        handleChange(e)
    }



    const data = {
        ...form.data,
        generated: generated
    };
    const submitData = {
        ...data,
        generated: generated,
    }

    const submit = () => {
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
    return({
        change: handleChange,
        data,
        handlers: {
            toggleGenerated,
            changeCertificateType
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