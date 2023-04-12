export function mockWatchlistData(symbols: string[]): unknown {
  return {
    quoteResponse: {
      result: [
        {
          language: "en-GB",
          region: "GB",
          quoteType: "EQUITY",
          typeDisp: "Equity",
          quoteSourceName: "Nasdaq Real Time Price",
          triggerable: true,
          customPriceAlertConfidence: "HIGH",
          quoteSummary: {
            earnings: {
              maxAge: 86400,
              earningsChart: {
                quarterly: [
                  {
                    date: "1Q2022",
                    actual: 1.07,
                    estimate: 0.75,
                  },
                  {
                    date: "2Q2022",
                    actual: 0.76,
                    estimate: 0.6,
                  },
                  {
                    date: "3Q2022",
                    actual: 1.05,
                    estimate: 0.99,
                  },
                  {
                    date: "4Q2022",
                    actual: 1.19,
                    estimate: 1.13,
                  },
                ],
                currentQuarterEstimate: 0.85,
                currentQuarterEstimateDate: "1Q",
                currentQuarterEstimateYear: 2023,
                earningsDate: [1681934400],
              },
              financialsChart: {
                yearly: [
                  {
                    date: 2019,
                    revenue: 24578000000,
                    earnings: -862000000,
                  },
                  {
                    date: 2020,
                    revenue: 31536000000,
                    earnings: 721000000,
                  },
                  {
                    date: 2021,
                    revenue: 53823000000,
                    earnings: 5519000000,
                  },
                  {
                    date: 2022,
                    revenue: 81462000000,
                    earnings: 12556000000,
                  },
                ],
                quarterly: [
                  {
                    date: "1Q2022",
                    revenue: 18756000000,
                    earnings: 3318000000,
                  },
                  {
                    date: "2Q2022",
                    revenue: 16934000000,
                    earnings: 2259000000,
                  },
                  {
                    date: "3Q2022",
                    revenue: 21454000000,
                    earnings: 3292000000,
                  },
                  {
                    date: "4Q2022",
                    revenue: 24318000000,
                    earnings: 3687000000,
                  },
                ],
              },
              financialCurrency: "USD",
            },
          },
          currency: "USD",
          messageBoardId: "finmb_27444752",
          fullExchangeName: "NasdaqGS",
          shortName: "Tesla, Inc.",
          longName: "Tesla, Inc.",
          regularMarketOpen: 199.91,
          averageDailyVolume3Month: 173806511,
          averageDailyVolume10Day: 131723460,
          beta: 2.070501,
          fiftyTwoWeekLowChange: 93.22,
          fiftyTwoWeekLowChangePercent: 0.9156272,
          fiftyTwoWeekRange: "101.81 - 384.29",
          fiftyTwoWeekHighChange: -189.26001,
          fiftyTwoWeekHighChangePercent: -0.49249268,
          fiftyTwoWeekLow: 101.81,
          fiftyTwoWeekHigh: 384.29,
          earningsTimestamp: 1681934400,
          earningsTimestampStart: 1681934400,
          earningsTimestampEnd: 1681934400,
          trailingAnnualDividendRate: 0,
          trailingPE: 50.789062,
          pegRatio: 4.51,
          dividendsPerShare: 0,
          trailingAnnualDividendYield: 0,
          revenue: 81462002000,
          priceToSales: 7.575243,
          marketState: "REGULAR",
          epsTrailingTwelveMonths: 3.84,
          epsForward: 5.47,
          epsCurrentYear: 3.9,
          epsNextQuarter: 0.93,
          priceEpsCurrentYear: 50.00769,
          priceEpsNextQuarter: 209.70967,
          sharesOutstanding: 3164100096,
          bookValue: 14.129,
          fiftyDayAverage: 187.5058,
          fiftyDayAverageChange: 7.5242004,
          fiftyDayAverageChangePercent: 0.04012783,
          twoHundredDayAverage: 215.82443,
          twoHundredDayAverageChange: -20.794434,
          twoHundredDayAverageChangePercent: -0.09634884,
          marketCap: 617094447104,
          forwardPE: 35.65448,
          priceToBook: 13.803525,
          sourceInterval: 15,
          exchangeDataDelayedBy: 0,
          exchangeTimezoneName: "America/New_York",
          exchangeTimezoneShortName: "EDT",
          pageViews: {
            midTermTrend: "UP",
            longTermTrend: "UP",
            shortTermTrend: "UP",
          },
          gmtOffSetMilliseconds: -14400000,
          esgPopulated: false,
          tradeable: false,
          cryptoTradeable: false,
          priceHint: 2,
          totalCash: 22185001000,
          floatShares: 2704010527,
          ebitda: 17439000576,
          shortRatio: 0.52,
          preMarketChange: -7.4615,
          preMarketChangePercent: -3.5966,
          preMarketTime: 1680528599,
          targetPriceHigh: 300,
          targetPriceLow: 24.33,
          targetPriceMean: 197.61,
          targetPriceMedian: 210,
          preMarketPrice: 199.999,
          heldPercentInsiders: 14.537,
          heldPercentInstitutions: 44.918,
          regularMarketChange: -12.430008,
          regularMarketChangePercent: -5.99152,
          regularMarketTime: 1680538050,
          regularMarketPrice: 195.03,
          regularMarketDayHigh: 202.6897,
          regularMarketDayRange: "193.84 - 202.6897",
          regularMarketDayLow: 193.84,
          regularMarketVolume: 95510208,
          sharesShort: 87004969,
          sharesShortPrevMonth: 82116960,
          shortPercentFloat: 3.35,
          regularMarketPreviousClose: 207.46,
          bid: 194.27,
          ask: 194.35,
          bidSize: 11,
          askSize: 13,
          exchange: "NMS",
          market: "us_market",
          firstTradeDateMilliseconds: 1277818200000,
          symbol: "MOON",
        },
        {
          language: "en-GB",
          region: "GB",
          quoteType: "EQUITY",
          typeDisp: "Equity",
          quoteSourceName: "Nasdaq Real Time Price",
          triggerable: true,
          customPriceAlertConfidence: "HIGH",
          quoteSummary: {
            earnings: {
              maxAge: 86400,
              earningsChart: {
                quarterly: [
                  {
                    date: "1Q2022",
                    actual: 3.53,
                    estimate: 2.89,
                  },
                  {
                    date: "2Q2022",
                    actual: 3.2,
                    estimate: 2.94,
                  },
                  {
                    date: "3Q2022",
                    actual: 3.1,
                    estimate: 2.13,
                  },
                  {
                    date: "4Q2022",
                    actual: 0.12,
                    estimate: 0.45,
                  },
                ],
                currentQuarterEstimate: 2.86,
                currentQuarterEstimateDate: "1Q",
                currentQuarterEstimateYear: 2023,
                earningsDate: [1681848000],
              },
              financialsChart: {
                yearly: [
                  {
                    date: 2019,
                    revenue: 20156447000,
                    earnings: 1866916000,
                  },
                  {
                    date: 2020,
                    revenue: 24996056000,
                    earnings: 2761395000,
                  },
                  {
                    date: 2021,
                    revenue: 29697844000,
                    earnings: 5116228000,
                  },
                  {
                    date: 2022,
                    revenue: 31615550000,
                    earnings: 4491924000,
                  },
                ],
                quarterly: [
                  {
                    date: "1Q2022",
                    revenue: 7867767000,
                    earnings: 1597447000,
                  },
                  {
                    date: "2Q2022",
                    revenue: 7970141000,
                    earnings: 1440951000,
                  },
                  {
                    date: "3Q2022",
                    revenue: 7925589000,
                    earnings: 1398242000,
                  },
                  {
                    date: "4Q2022",
                    revenue: 7852053000,
                    earnings: 55284000,
                  },
                ],
              },
              financialCurrency: "USD",
            },
          },
          currency: "USD",
          messageBoardId: "finmb_32012",
          fullExchangeName: "NasdaqGS",
          shortName: "Netflix, Inc.",
          longName: "Netflix, Inc.",
          regularMarketOpen: 341.83,
          averageDailyVolume3Month: 7878036,
          averageDailyVolume10Day: 7859100,
          beta: 1.258856,
          fiftyTwoWeekLowChange: 183.93001,
          fiftyTwoWeekLowChangePercent: 1.130416,
          fiftyTwoWeekRange: "162.71 - 396.02",
          fiftyTwoWeekHighChange: -49.379974,
          fiftyTwoWeekHighChangePercent: -0.124690615,
          fiftyTwoWeekLow: 162.71,
          fiftyTwoWeekHigh: 396.02,
          earningsTimestamp: 1681848000,
          earningsTimestampStart: 1681848000,
          earningsTimestampEnd: 1681848000,
          trailingAnnualDividendRate: 0,
          trailingPE: 33.45946,
          pegRatio: 1.88,
          dividendsPerShare: 0,
          trailingAnnualDividendYield: 0,
          revenue: 31615549400,
          priceToSales: 4.882885,
          marketState: "REGULAR",
          epsTrailingTwelveMonths: 10.36,
          epsForward: 14.38,
          epsCurrentYear: 11.48,
          epsNextQuarter: 3.07,
          priceEpsCurrentYear: 30.195124,
          priceEpsNextQuarter: 112.912056,
          sharesOutstanding: 445347008,
          bookValue: 46.654,
          fiftyDayAverage: 333.741,
          fiftyDayAverageChange: 12.899017,
          fiftyDayAverageChangePercent: 0.038649783,
          twoHundredDayAverage: 271.89056,
          twoHundredDayAverageChange: 74.74945,
          twoHundredDayAverageChangePercent: 0.27492476,
          marketCap: 154375094272,
          forwardPE: 24.105703,
          priceToBook: 7.430017,
          sourceInterval: 15,
          exchangeDataDelayedBy: 0,
          exchangeTimezoneName: "America/New_York",
          exchangeTimezoneShortName: "EDT",
          pageViews: {
            midTermTrend: "UP",
            longTermTrend: "UP",
            shortTermTrend: "UP",
          },
          gmtOffSetMilliseconds: -14400000,
          esgPopulated: false,
          tradeable: false,
          cryptoTradeable: false,
          priceHint: 2,
          totalCash: 6058452000,
          floatShares: 439281153,
          ebitda: 5969512960,
          shortRatio: 1.42,
          preMarketChange: -3.41,
          preMarketChangePercent: -0.987034,
          preMarketTime: 1680528597,
          targetPriceHigh: 440,
          targetPriceLow: 215,
          targetPriceMean: 357.23,
          targetPriceMedian: 352,
          preMarketPrice: 342.07,
          heldPercentInsiders: 1.44,
          heldPercentInstitutions: 83.594,
          regularMarketChange: 1.1600037,
          regularMarketChangePercent: 0.33576578,
          regularMarketTime: 1680538047,
          regularMarketPrice: 346.64,
          regularMarketDayHigh: 347.16,
          regularMarketDayRange: "340.41 - 347.16",
          regularMarketDayLow: 340.41,
          regularMarketVolume: 2191127,
          sharesShort: 8413366,
          sharesShortPrevMonth: 8713369,
          shortPercentFloat: 1.92,
          regularMarketPreviousClose: 345.48,
          bid: 345.44,
          ask: 345.84,
          bidSize: 9,
          askSize: 13,
          exchange: "NMS",
          market: "us_market",
          firstTradeDateMilliseconds: 1022160600000,
          symbol: "GOAT",
        },
        {
          language: "en-GB",
          region: "GB",
          quoteType: "EQUITY",
          typeDisp: "Equity",
          quoteSourceName: "Delayed Quote",
          triggerable: false,
          customPriceAlertConfidence: "LOW",
          quoteSummary: {
            earnings: {
              maxAge: 86400,
              earningsChart: {
                quarterly: [],
                earningsDate: [1678957200],
              },
              financialsChart: {
                yearly: [
                  {
                    date: 2019,
                    revenue: 771800000,
                    earnings: -317300000,
                  },
                  {
                    date: 2020,
                    revenue: 1163000000,
                    earnings: -226400000,
                  },
                  {
                    date: 2021,
                    revenue: 1735000000,
                    earnings: -330500000,
                  },
                  {
                    date: 2022,
                    revenue: 1974700000,
                    earnings: -294100000,
                  },
                ],
                quarterly: [
                  {
                    date: "1Q2022",
                    revenue: 506550000,
                    earnings: -76900000,
                  },
                  {
                    date: "2Q2022",
                    revenue: 506550000,
                    earnings: -76900000,
                  },
                  {
                    date: "3Q2022",
                    revenue: 480800000,
                    earnings: -70150000,
                  },
                  {
                    date: "4Q2022",
                    revenue: 480800000,
                    earnings: -70150000,
                  },
                ],
              },
              financialCurrency: "GBP",
            },
          },
          currency: "GBp",
          messageBoardId: "finmb_266895252",
          fullExchangeName: "LSE",
          shortName: "DELIVEROO PLC CLASS A ORD 0.5P",
          longName: "Deliveroo plc",
          regularMarketOpen: 91,
          averageDailyVolume3Month: 3275544,
          averageDailyVolume10Day: 3299839,
          fiftyTwoWeekLowChange: 19.919998,
          fiftyTwoWeekLowChangePercent: 0.27445573,
          fiftyTwoWeekRange: "72.58 - 132.95",
          fiftyTwoWeekHighChange: -40.449997,
          fiftyTwoWeekHighChangePercent: -0.3042497,
          fiftyTwoWeekLow: 72.58,
          fiftyTwoWeekHigh: 132.95,
          earningsTimestamp: 1678957200,
          earningsTimestampStart: 1678957200,
          earningsTimestampEnd: 1678957200,
          trailingAnnualDividendRate: 0,
          pegRatio: -0.18,
          dividendsPerShare: 0,
          trailingAnnualDividendYield: 0,
          revenue: 1974700030,
          priceToSales: 0.8222883,
          marketState: "POST",
          epsTrailingTwelveMonths: -0.13,
          epsForward: -4.52,
          epsCurrentYear: -9.62,
          priceEpsCurrentYear: -9.615385,
          sharesOutstanding: 1755430016,
          bookValue: 0.452,
          fiftyDayAverage: 88.5592,
          fiftyDayAverageChange: 3.9408035,
          fiftyDayAverageChangePercent: 0.044499088,
          twoHundredDayAverage: 89.0735,
          twoHundredDayAverageChange: 3.4264984,
          twoHundredDayAverageChangePercent: 0.038468212,
          marketCap: 1623772672,
          forwardPE: -0.20464602,
          priceToBook: 204.64603,
          sourceInterval: 15,
          exchangeDataDelayedBy: 15,
          exchangeTimezoneName: "Europe/London",
          exchangeTimezoneShortName: "BST",
          gmtOffSetMilliseconds: 3600000,
          esgPopulated: false,
          tradeable: false,
          cryptoTradeable: false,
          priceHint: 2,
          totalCash: 949100030,
          floatShares: 1047794652,
          ebitda: -162400000,
          targetPriceHigh: 170,
          targetPriceLow: 90,
          targetPriceMean: 125.67,
          targetPriceMedian: 114.5,
          heldPercentInsiders: 10.349,
          heldPercentInstitutions: 59.491,
          regularMarketChange: 1,
          regularMarketChangePercent: 1.0928961,
          regularMarketTime: 1680536127,
          regularMarketPrice: 92.5,
          regularMarketDayHigh: 94.8,
          regularMarketDayRange: "87.4 - 94.8",
          regularMarketDayLow: 87.4,
          regularMarketVolume: 2876370,
          regularMarketPreviousClose: 91.5,
          bid: 91.8,
          ask: 92.55,
          exchange: "LSE",
          market: "gb_market",
          firstTradeDateMilliseconds: 1617174000000,
          symbol: "BOOK",
        },
      ],
      error: null,
    },
  };
}
