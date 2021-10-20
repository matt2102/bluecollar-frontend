export function maybe(exp, d) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export function getImage(item){
  if(!item){
    return ""
  }
  if(item.image){
    return maybe(()=>item.image.url, "")
  }
  if(item.images){
    return maybe(()=>item.images[0].url, "")
  }
  if(item.thumbnail){
    return maybe(()=>item.thumbnail.url, "")
  }
  return ""
}


export function getDate(timestamp){
  const d = new Date(timestamp)
  const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const i = d.getMonth() + 1
  const dd = d.getDate()
  const y = d.getFullYear()
  const m = months[i]
  return `${m} ${dd}, ${y}`
}

export function formatMoney(float){
  return float.toFixed(2)
}