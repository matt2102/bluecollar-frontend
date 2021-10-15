import Consulting from "../../components/Consulting/Consulting"
import InfoCard from "../../components/InfoCard"
import Loading from "../../components/Loading";
import { maybe } from "../../misc";
import { useConsultingProductQuery } from "./queries"

export const ConsultingView = () => {
  const {data, loading} = useConsultingProductQuery({
    variables: {
      first: 1,
      filter: {
        search: "Consulting Session"
      }
    }
  })
  if(loading) return <Loading/>
  const consultingProduct = maybe(()=> data.products.edges[0].node, {})
  return(
    <div>
      <InfoCard
        heading3="Need More Help?"
        heading1="Set Up a Consulting Session!"/>
      <Consulting
        data = {consultingProduct}
      />
    </div>
  )
}

export default ConsultingView