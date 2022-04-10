export default function deepEqual(object1: any, object2: any) {
  
  if (typeof object1 === "function" || typeof object1 === "undefined")
    return true;
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object: any) {
  return (object != null && typeof object === "object") || typeof object === "function" ||typeof object === "undefined" ;
}
