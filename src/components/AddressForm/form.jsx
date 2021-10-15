import React from "react"
import useForm from "../../hooks/useForm";
import { maybe } from "../../misc";

const getAddressUpdateData = (address) => {
    return({
        id: maybe(()=>address.id, ""),
        firstName: maybe(()=>address.firstName, ""),
        lastName: maybe(()=>address.lastName, ""),
        streetAddress1: maybe(()=>address.streetAddress1, ""),
        streetAddress2: maybe(()=>address.streetAddress2, ""),
        city: maybe(()=>address.city, ""),
        countryArea: maybe(()=>address.countryArea, ""),
        postalCode: maybe(()=>address.postalCode, ""),
        isDefaultShippingAddress: maybe(() => address?.isDefaultShippingAddress, false),
        isDefaultBillingAddress: maybe(() => address?.isDefaultBillingAddress, false),
    })
}

function useAddressForm(
    address,
    onSubmit,
    // opts
    // ^^^ if we need options later we can uncomment
){
    const [changed, setChanged] = React.useState(false)
    const [state, setState] = React.useState(maybe(() => address.countryArea, "AL"))
    const triggerChange = () => setChanged(true);

    const form = useForm(
        getAddressUpdateData(address)
    )

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
    initialData:address,
    onSubmit,
    ...rest
}) => {
    const props = useAddressForm(address, onSubmit, rest)
    return <form onSubmit={props.submit}>{children(props)}</form>;
}

export default AddressEditForm