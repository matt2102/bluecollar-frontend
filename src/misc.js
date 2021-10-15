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
  if(item.image){
    return maybe(()=>item.image.url, "")
  }
  if(item.images){
    return maybe(()=>item.images[0].url, "")
  }
  return ""
}