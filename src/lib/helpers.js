export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function round(number: number, digits: number = 1) {
  return Math.round((number + Math.pow(10, -digits - 2)) * Math.pow(10, digits)) / Math.pow(10, digits);
}
