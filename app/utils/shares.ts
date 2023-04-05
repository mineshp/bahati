// export const calcGainLossPrice = (totalShares: number, originalSharePrice: number, currentSharePrice: number) => ((totalShares * currentSharePrice) - (totalShares * originalSharePrice)).toFixed(2);

export const calcGainLossPercentage = (
  totalShares: number,
  originalSharePrice: number,
  currentSharePrice: number
) =>
  Number(
    (
      Number(
        (
          Number(totalShares * currentSharePrice) -
          Number(totalShares * originalSharePrice)
        ).toFixed(2)
      ) /
      (totalShares * currentSharePrice)
    ).toFixed(2)
  );

export const calcGainLossDailyValue = (
  previousSharePrice: number,
  todaysSharePrice: number
) => Number((Number(todaysSharePrice) - Number(previousSharePrice)).toFixed(3));

export const calcGainLossDailyPercentage = (
  previousSharePrice: number,
  todaysSharePrice: number
) =>
  Number(
    (Number(
      (Number(todaysSharePrice) - Number(previousSharePrice)).toFixed(3)
    ) /
      Number(todaysSharePrice)) *
      100
  ).toFixed(3);

export const calcTotalShareValue = (
  totalShares: number,
  currentSharePrice: number,
  exchangeRate: number
) => (totalShares * (currentSharePrice * exchangeRate)).toFixed(2);

export const currencySymbol = (currency: string): string => {
  switch (currency) {
    case "USD":
      return "$";
    case "GBp":
      return "p";
    case "EUR":
      return "€";
    default:
      return "";
  }
};
