function offsetFor(date: Date, timeZone: string) {
  const zone = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? "GMT+00:00";
  return zone === "GMT" ? "+00:00" : zone.replace("GMT", "");
}
export function nowAsRfc3339(timeZone: string) {
  const now = new Date(); const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now); const value = (name: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === name)?.value ?? "00";
  return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}:${value("second")}${offsetFor(now, timeZone)}`;
}
export function civilDateTimeAsRfc3339(civilDateTime: string, timeZone: string) {
  const [date, time = "00:00"] = civilDateTime.split("T"); const [year, month, day] = date.split("-").map(Number); const [hour, minute, second = 0] = time.split(":").map(Number); const approximateInstant = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  return `${date}T${time.length === 5 ? `${time}:00` : time}${offsetFor(approximateInstant, timeZone)}`;
}
export function formatRfc3339ForDisplay(value: string) { return value.replace("T", " ").replace(/([+-]\d\d:\d\d|Z)$/, ""); }
