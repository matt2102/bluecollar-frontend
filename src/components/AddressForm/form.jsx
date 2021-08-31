import React from "react"
import useForm from "../../hooks/useForm";
import { maybe } from "../../misc";

// async function handleFormSubmit(
//   data,
//   onSubmit,
//   setChanged
// ){
//   const errors = await onSubmit(data);
//   const ok = errors.length === 0;
//   if (ok) {
//     setChanged(false);
//   }
//   return ok;
// }

function useAddressForm(
    initialData,
    onSubmit,
    // opts
    // ^^^ if we need options later we can uncomment
){
    const [changed, setChanged] = React.useState(false)
    const [state, setState] = React.useState(maybe(() => initialData.countryArea, "AL"))
    const triggerChange = () => setChanged(true);

    const form = useForm(initialData)

    const handleChange = (event, cb) =>{
        form.change(event, cb);
        if(!changed){
            triggerChange()
        }

    }
    const handleStateSelect = (event, cb) => {
      setState(event.target.value)
      handleChange(event, cb)
    }
    const data = {
        ...form.data,
        countryArea: state
    };
    const submitData = {
        ...data,
        countryArea: state
    }
    const submit = () => {
      onSubmit(submitData);
      setChanged(false)
    }
    return({
        change: handleChange,
        data,
        handlers: {
            selectState: handleStateSelect,

        },
        hasChanged: changed,
        submit
    })

}


const AddressEditForm = ({
    children,
    initialData,
    onSubmit,
    ...rest
}) => {
    const props = useAddressForm(initialData, onSubmit, rest)
    return <form onSubmit={props.submit}>{children(props)}</form>;
}

export default AddressEditForm