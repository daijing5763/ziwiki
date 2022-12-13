export function getCountBeforeLayer(layer:number, n:number) {
  if (layer == 0) { return 0 }
  return Math.floor((1-Math.pow(n,layer))/(1-n))
}

export  function getIndex(layer:number, index:number, n:number) {
  let CountBeforeLayer = getCountBeforeLayer(layer,n)
  return CountBeforeLayer+index
}


export function getLayer(x:number, n:number) {
  var layer=0
  while (x >= 0) {
      x-=Math.pow(n,layer)
      layer+=1
  }
  return layer-1
}

export function getFather(x:number, n:number) {
  var layer=getLayer(x,n)
  var beforeCount=getCountBeforeLayer(layer,n)
  var beforeBCount = getCountBeforeLayer(layer-1,n)
  var currentIndex=x-beforeCount
  var beforeIndex=Math.floor(currentIndex/n)
  return beforeIndex+beforeBCount
}

export function compare(x:number, before:number, n:number) {
  if (x < before){
      return false 
  } else if (x == before) {
      return true
  }
  var f = getFather(x,n)
  return compare(f,before,n)
}

export function acccompare(x:number, before:number, n:number) {
  if (x < before){
      return false 
  } else if (x == before) {
      return true
  }
  return false
}
