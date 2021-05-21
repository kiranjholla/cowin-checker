export function strPad(data, chars, margin = 0, paddingChar = ' ', align = 'left') {
  const marginPadding = margin > 0 ? new Array(margin + 1).join(paddingChar) : '';
  let charsPadding = '';
  let output = `${data}`;

  if (output.length < chars - margin) {
    charsPadding = new Array(chars - output.length - margin + 1).join(paddingChar);
  } else {
    output = output.slice(0, chars - margin);
  }

  if (align === 'left') {
    return `${charsPadding}${output}${marginPadding}`;
  } else {
    return `${marginPadding}${output}${charsPadding}`;
  }
}

export function leftPad(data, chars, margin, paddingChar) {
  return strPad(data, chars, margin, paddingChar, 'left');
}

export function rightPad(data, chars, margin, paddingChar) {
  return strPad(data, chars, margin, paddingChar, 'right');
}
