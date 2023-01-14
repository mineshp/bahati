import {
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CalculatorIcon,
  CalendarIcon,
  BriefcaseIcon,
} from "@heroicons/react/solid";
import Pill from "./library/pill";
import type { StockData, TotalShareItemsByCode } from "../types/shares";

interface Props {
  exchangeData: TotalShareItemsByCode;
  shareData: StockData;
}

function showFlag(country: string) {
  switch (country) {
    case "United States":
      return (
        <img
          src="/_static/flags/us.png"
          alt={country}
          aria-hidden="true"
          className="m-1 h-4 w-7 sm:m-1.5 sm:h-6 sm:w-10"
        />
      );
    case "Germany":
      return (
        <img
          src="/_static/flags/de.png"
          alt={country}
          aria-hidden="true"
          className="m-1 h-4 w-7 sm:m-1.5 sm:h-6 sm:w-10"
        />
      );
    default:
      return (
        <img
          src="/_static/flags/gb.png"
          alt={country}
          aria-hidden="true"
          className="m-1 h-4 w-7 sm:m-1.5 sm:h-6 sm:w-10"
        />
      );
  }
}

function showCurrencyIcon(currency: string) {
  switch (currency) {
    case "USD":
      return (
        <CurrencyDollarIcon
          className="h-7 w-8 fill-rose-300 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      );
    case "EUR":
      return (
        <CurrencyEuroIcon
          className="h-7 w-8 fill-rose-300 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      );
    default:
      return (
        <CurrencyPoundIcon
          className="h-7 w-8 fill-rose-300 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      );
  }
}

function showShareValueUpOrDown(
  currentValue: number,
  totalShareItems: TotalShareItemsByCode
) {
  const highestPurchasePrice = totalShareItems.sort(
    (a, b) => b.originalCostPrice - a.originalCostPrice
  )[0].originalCostPrice;

  return {
    value: (currentValue - highestPurchasePrice).toFixed(2),
    isUp: currentValue > highestPurchasePrice,
    icon:
      currentValue > highestPurchasePrice ? (
        <ArrowCircleUpIcon
          className="h-7 w-8 fill-teal-400 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ) : (
        <ArrowCircleDownIcon
          className="h-7 w-8 fill-rose-400 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
  };
}

function pillInformation(
  exchangeData: TotalShareItemsByCode,
  shareData: StockData
) {
  const information: never[] = [];
  const shareValueUpOrDown = showShareValueUpOrDown(
    shareData.currentPrice,
    exchangeData
  );
  const currencyConversionLabel =
    exchangeData[0].currency === "GBP"
      ? "1"
      : `${exchangeData[0].exchangeRate.toFixed(2)}p / 1 ${
          exchangeData[0].currency
        }`;

  const totalShares = exchangeData.reduce(
    (acc, cur) => acc + Number(cur.totalShares),
    0
  );

  const accountsAssociated: Array<string> = Array.from(
    new Set(exchangeData.map((item: any) => item.account))
  );
  const account =
    accountsAssociated.length < 2
      ? accountsAssociated[0]
      : accountsAssociated.join(" & ");

  return [
    ...information,
    {
      label: currencyConversionLabel,
      icon: showCurrencyIcon(exchangeData[0].currency),
      key: 1,
    },
    {
      label: shareData.country,
      icon: showFlag(shareData.country),
      key: 2,
    },
    {
      label: shareValueUpOrDown.value,
      icon: shareValueUpOrDown.icon,
      key: 3,
    },
    {
      label: `${totalShares} Shares`,
      icon: (
        <CalculatorIcon
          className="h-7 w-8 fill-indigo-400 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
      key: 4,
    },
    {
      label: "52 Week Change",
      icon: (
        <CalendarIcon
          className="h-7 w-8 fill-rose-300 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
      key: 5,
    },
    {
      label: account,
      icon: (
        <BriefcaseIcon
          className="h-7 w-8 fill-indigo-400 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
      key: 6,
    },
  ];
}

export default function InformationBar(prop: Props) {
  const items = pillInformation(prop.exchangeData, prop.shareData);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 sm:gap-8 lg:grid-cols-6">
      {items?.map(({ label, key, icon }) => (
        <div key={key}>
          <Pill data={label} icon={icon} />
        </div>
      ))}
    </div>
  );
}
