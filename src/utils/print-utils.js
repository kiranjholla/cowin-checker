import { strPad } from './str-utils.js';

export function printRow(data, columns) {
  const row = columns.reduce(
    (rowStr, col) => `${rowStr}${strPad(data[col.key], col.length, 1, ' ', col.align === 'left' ? 'right' : 'left')}`,
    ''
  );
  console.log(row);
}
