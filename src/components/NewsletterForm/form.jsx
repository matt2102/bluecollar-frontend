import React from "react"
import useForm from "../../hooks/useForm";

function useNewsletterForm(
    initialData,
    onSubmit,
){
    const [changed, setChanged] = React.useState(false)
    const triggerChange = () => setChanged(true);

    const form = useForm(initialData)

    const handleChange = (event, cb) =>{
        form.change(event, cb);
        if(!changed){
            triggerChange()
        }

    }
    const data = {
        ...form.data,
    };
    const submitData = {
        ...data,
    }
    const submit = () => {
      onSubmit(submitData);
      setChanged(false)
    }
    return({
        change: handleChange,
        data,
        handlers: {},
        hasChanged: changed,
        submit
    })

}


const NewsletterEditForm = ({
    children,
    initialData,
    onSubmit,
}) => {
    const props = useNewsletterForm(initialData, onSubmit)
    return <form onSubmit={props.submit}>{children(props)}</form>;
}

export default NewsletterEditForm