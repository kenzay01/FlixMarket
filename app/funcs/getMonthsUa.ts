export function getMonthsUa(value: string) {
  if (value === "1") return "місяць";
  if (value === "3") return "місяці";
  if (value === "6" || value === "12") return "місяців";
}
