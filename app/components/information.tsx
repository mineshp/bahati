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

function displayCountry(country: string) {
  switch (country) {
    case "United States":
      return {
        flag: (
          <img
            src="/_static/flags/us.png"
            alt={country}
            aria-hidden="true"
            className="m-1 h-4 w-7 sm:m-1.5 sm:h-6 sm:w-10"
          />
        ),
        label: "USA",
      };
    case "Germany":
      return {
        flag: (
          <img
            src="/_static/flags/de.png"
            alt={country}
            aria-hidden="true"
            className="m-1 h-4 w-7 sm:m-1.5 sm:h-6 sm:w-10"
          />
        ),
        label: "GER",
      };
    default:
      return {
        flag: (
          <img
            src="/_static/flags/gb.png"
            alt={country}
            aria-hidden="true"
            className="m-1 h-4 w-7 sm:m-1.5 sm:h-6 sm:w-10"
          />
        ),
        label: "UK",
      };
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
          className="h-7 w-8 fill-rose-300 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
  };
}

function showCalendar(fiftyTwoWeekChange: number) {
  if (fiftyTwoWeekChange > 1) {
    return (
      <CalendarIcon
        className="h-7 w-8 fill-teal-400 sm:h-9 sm:w-10"
        aria-hidden="true"
      />
    );
  } else {
    return (
      <CalendarIcon
        className="h-7 w-8 fill-rose-300 sm:h-9 sm:w-10"
        aria-hidden="true"
      />
    );
  }
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
  const currencyConversion =
    exchangeData[0].currency === "GBP"
      ? "1"
      : `1 / ${exchangeData[0].exchangeRate.toFixed(2)}p`;

  const totalSharesOwned = exchangeData.reduce(
    (acc, cur) => acc + Number(cur.totalShares),
    0
  );

  const accountsAssociated: Array<string> = Array.from(
    new Set(exchangeData.map((item: any) => item.account))
  );
  const accountType =
    accountsAssociated.length < 2
      ? accountsAssociated[0]
      : accountsAssociated.join(" & ");

  return [
    ...information,
    {
      label: currencyConversion,
      icon: showCurrencyIcon(exchangeData[0].currency),
      tooltip: "Current exchange rate",
      key: 1,
    },
    {
      label: displayCountry(shareData.country).label,
      icon: displayCountry(shareData.country).flag,
      tooltip: "Country",
      key: 2,
    },
    {
      label: shareValueUpOrDown.value,
      icon: shareValueUpOrDown.icon,
      tooltip: "Total share value",
      key: 3,
    },
    {
      label: `${totalSharesOwned} Units`,
      icon: (
        <CalculatorIcon
          className="h-7 w-8 fill-indigo-400 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
      tooltip: "Total units owned",
      key: 4,
    },
    {
      label: `${shareData.fiftyTwoWeekChange} / 52W`,
      icon: showCalendar(parseFloat(shareData.fiftyTwoWeekChange)),
      tooltip: "52 Week change",
      key: 5,
    },
    {
      label: accountType,
      icon: (
        <BriefcaseIcon
          className="h-7 w-8 fill-indigo-400 sm:h-9 sm:w-10"
          aria-hidden="true"
        />
      ),
      tooltip: "Account type",
      key: 6,
    },
  ];
}

export default function InformationBar(prop: Props) {
  const items = pillInformation(prop.exchangeData, prop.shareData);

  return (
    <div className="grid grid-cols-3 gap-2 p-4 text-sm sm:gap-8 lg:grid-cols-6">
      {items?.map(({ label, key, icon, tooltip }) => (
        <div key={key}>
          <Pill data={label} icon={icon} tooltip={tooltip} />
        </div>
      ))}
    </div>
  );
}
