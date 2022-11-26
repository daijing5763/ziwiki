export function arrayAppend(obj, value) {
  const newobj = obj
  newobj.push(value)
  return newobj;
}
export function getCountBeforeLayer(layer, n) {
  if (layer == 0) { return 0 }
  return Math.floor((1-Math.pow(n,layer))/(1-n))
}

export  function getIndex(layer, index, n) {
  let CountBeforeLayer = getCountBeforeLayer(layer,n)
  return CountBeforeLayer+index
}


export function getLayer(x, n) {
  var layer=0
  while (x >= 0) {
      x-=Math.pow(n,layer)
      layer+=1
  }
  return layer-1
}

export function getFather(x, n) {
  var layer=getLayer(x,n)
  var beforeCount=getCountBeforeLayer(layer,n)
  var beforeBCount = getCountBeforeLayer(layer-1,n)
  var currentIndex=x-beforeCount
  var beforeIndex=Math.floor(currentIndex/n)
  return beforeIndex+beforeBCount
}

export function compare(x, before, n) {
  if (x < before){
      return false 
  } else if (x == before) {
      return true
  }
  var f = getFather(x,n)
  return compare(f,before,n)
}

export function acccompare(x, before, n) {
  if (x < before){
      return false 
  } else if (x == before) {
      return true
  }
  return false
}
