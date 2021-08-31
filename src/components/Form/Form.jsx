import useForm from "../../hooks/useForm";

function Form(props){
  const{children, initial, resetOnSubmit, onSubmit, className} = props;
  const renderProps = useForm(initial, onSubmit)
  function handleSubmit(event, cb){
    const {reset, submit} = renderProps
    if(event){
      event.stopPropagation();
      event.preventDefault();
    }
    if(cb){
      cb()
    }
    if(resetOnSubmit){
      reset()
    }
    submit();
  }
  return <form onSubmit={handleSubmit} className={className ? className : null}>{children(renderProps)}</form>;
}

export default Form