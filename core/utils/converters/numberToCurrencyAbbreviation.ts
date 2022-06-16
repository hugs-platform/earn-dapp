export const numberToCurrencyAbbreviation = (num: number, decimals: number) => {
  const symbolAndValueArray = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const avoidedCharacters = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = symbolAndValueArray.length - 1; i > 0; i--) {
    if (num >= symbolAndValueArray[i].value) {
      break;
    }
  }
  return "USD " + (num / symbolAndValueArray[i].value).toFixed(decimals).replace(avoidedCharacters, "$1") + symbolAndValueArray[i].symbol;
};
