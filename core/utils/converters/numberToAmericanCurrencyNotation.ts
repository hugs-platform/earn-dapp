export const toAmericanCurrencyNotation = (num: number) => {
  // gives number decimals + converts to string to split it
  const convertedNumber = num.toFixed(2).toString().split(".");
  // gives komma's to number
  convertedNumber[0] = convertedNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$ " + convertedNumber.join(".");
};
