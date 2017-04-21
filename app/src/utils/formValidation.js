let lengthExceedsMaxTrigger = (string) => {
  return string.length > 20 ? true : false
}

let triggerLengthIsTooShort = string => {
  return string.length < 1 ? true : false
}

//let overflow
//required is true, max length,a ll taht stuff
//


export { lengthExceedsMaxTrigger, triggerLengthIsTooShort }