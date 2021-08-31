import useRouter from "use-react-router"

function useNavigator(){
  const {
    location: { search },
    history
  } = useRouter()
  return(url, replace = false, preserveQs = false) => {
    const targetUrl = preserveQs ? url + search : url;
    if(replace){
      history.replace(targetUrl)
    } else {
      history.push(targetUrl)
    }
    window.scrollTo({ behavior: "smooth", top : 0});
  };
}

export default useNavigator