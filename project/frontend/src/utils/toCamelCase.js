const toCamelCase = (input) => {
  var regex =
    /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

  const inputArray = input.match(regex);

  if (inputArray === null) return input;

  let result = "";
  for (let i = 0, len = inputArray.length; i < len; i++) {
    let currentStr = inputArray[i];
    let tempStr = currentStr.toLowerCase();
    if (i !== 0) {
      // convert first letter to upper case (the word is in lowercase)
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
    }
    result += tempStr;
  }
  return result;
};

export default toCamelCase;
