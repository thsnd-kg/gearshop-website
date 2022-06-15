
export function moneyConverter(value) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(value);
}
