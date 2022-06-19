
export function moneyConverter(value) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(value);
}

export  function convertName(name) {
  switch (name) {
    case 'PENDING':
      return 'Đang xử lý';
    case 'SUCCESS':
      return 'Thành công';
    case 'CANCELED':
      return 'Huỷ đơn';
    case 'SHIPPING':
      return 'Đang giao';

    default:
      break;
  }
}
