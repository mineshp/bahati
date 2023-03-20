function subtractDateByDays(days: number) {
  const today = new Date();
  const start = today.setDate(today.getDate() - days);
  return new Date(start).toISOString().slice(0, 10);
}

export function retrieveStartAndEndDates(period: string) {
  switch (period) {
    case "1D":
      return {
        start: new Date().toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10),
      };
    case "1W":
      return {
        start: subtractDateByDays(7),
        end: new Date().toISOString().slice(0, 10),
      };
    case "1M":
      return {
        start: subtractDateByDays(30),
        end: new Date().toISOString().slice(0, 10),
      };
    case "3M":
      return {
        start: subtractDateByDays(90),
        end: new Date().toISOString().slice(0, 10),
      };
    case "1Y":
      return {
        start: subtractDateByDays(365),
        end: new Date().toISOString().slice(0, 10),
      };
    default:
      return {
        start: new Date().toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10),
      };
  }
}

export function formatDateForDisplay(date: number | string) {
  return new Date(date).toLocaleDateString("en-GB");
}

export function toMilliseconds(timestamp: number) {
  return timestamp * 1000;
}
