/**
 * Returns a capitalized string
 */
export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
 * Converts underscored string into camelCased
 */
export function underscoreToCamelCase(string: string) {
  return string.replace(/_([a-z])/gi, function($0, $1) { return $1.toUpperCase(); });
}

/*
 * Converts camelCased string into underscored.
 */
export function camelCaseToUnderscore(string: string) {
  return string.replace(/([a-z][A-Z])/g, function(m) { return m[0] + '_' + m[1].toLowerCase(); });
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
