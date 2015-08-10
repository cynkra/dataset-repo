import React from 'react';
import config from '../config/config.client';
import {getDataTypeText} from '../client/datasets/tags/store';

/**
 * Returns a capitalized string
 * @return string
 */
export function capitalize(string: string) {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : null;
}

/**
 * Rounds a float to specified precision(number of digits after the decimal point).
 * @return number
 */
export function round(number: number, precision: number = 0) {
  return Math.round((number + Math.pow(10, -precision - 2)) * Math.pow(10, precision)) / Math.pow(10, precision);
}

/**
 * Returns formatted number
 * @return string
 */
export function getLocaleString(number: number, separator: string = ',') {
  let parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

/**
 * @param size number Size in MB
 * @return string
 */
export function getSizeWithUnit(size: number) {
  let unit = 'MB';

  if (size >= 1000) {
    size /= 1000;
    unit = 'GB';
  } else if (size < 1) {
    size *= 1000;
    unit = 'KB';
  }

  return getLocaleString(round(size, 1)) + ' ' + unit;
}

/**
 * Returns path to the image.
 * @return string|null
 */
export function getImagePath(image, schema) {
  if (!image && schema) {
    const imagePath = config.images.datasetsGeneratedPath + schema + '.png';
    return checkImage(imagePath, schema) ? imagePath : null;
  }
  return image ? config.images.datasetsPath + image + '.png' : null;
}

/**
 * Returns true if image with passed src exists (both client and server side).
 * @return boolean
 */
export function checkImage(src: string, schema: string) {
  if (process.env.IS_BROWSER) {
    var req = new XMLHttpRequest();
    req.open('HEAD', src, false);
    try {
      req.send(null);
      return req.status === 200;
    } catch (e) {
      return false;
    }
  } else {
    const fs = require('fs');
    const path = require('path');

    if (fs.existsSync(path.join(__dirname, '..', '..', src))) {
      return true;
    } else {
      const sqlViz = require('../services/sqlviz/sqlviz.js');
      sqlViz.getSchema(schema);
      return false;
    }
  }
}

export function getTagName(name) {
  name = getDataTypeText(name);
  switch (name) {
    case 'LOB':
      return <abbr title='Large Objects like images or long texts'>{name}</abbr>;
    case 'Temporal':
      return <abbr title='Date, time or timestamp'>{name}</abbr>;
    case 'Spatial':
      return <abbr title='Geometric types like point, line or polygon'>{name}</abbr>;
    default:
      return name;
  }
}
