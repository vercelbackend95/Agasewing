export const STORE_CLOSURE = {
  closureStart: "2026-05-27",
  closureEnd: "2026-06-02",
  displayUntil: "2026-06-02",
  reopenDateLabel: "Wednesday 3 June",
} as const;

const LONDON_TIME_ZONE = "Europe/London";

export const getLondonDateString = (now: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: LONDON_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
};

const compareDateStrings = (left: string, right: string) => left.localeCompare(right);

export const isClosureBannerVisible = (now: Date = new Date()) =>
  compareDateStrings(getLondonDateString(now), STORE_CLOSURE.displayUntil) <= 0;

export const isStoreClosedForHoliday = (now: Date = new Date()) => {
  const today = getLondonDateString(now);
  return (
    compareDateStrings(today, STORE_CLOSURE.closureStart) >= 0 &&
    compareDateStrings(today, STORE_CLOSURE.closureEnd) <= 0
  );
};
