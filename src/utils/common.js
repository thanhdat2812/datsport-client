// export const formatCurrency = (x) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(x);
// };
export const formatCurrency = (x) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: x % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: x % 1 !== 0 ? 2 : 0,
  }).format(x);

  return formattedNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};