import { useDispatch } from "react-redux";


function useBanner(){
  const dispatch = useDispatch()
  function markSeen(item){
    dispatch({
      type: "MARK_SEEN",
      name: item.name
    })
  }
  return{markSeen}
}

export default useBanner