/**
 * Returns a capitalized string
 */
export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Rounds a float to specified precision(number of digits after the decimal point).
 */
export function round(number: number, precision: number = 0) {
  return Math.round((number + Math.pow(10, -precision - 2)) * Math.pow(10, precision)) / Math.pow(10, precision);
}

/**
 * Converts javascript object (associative array) to a simple array
 */
export function objectToArray(object: Object) {
  return Object.keys(object).map((key) => {
    return object[key];
  });
}
