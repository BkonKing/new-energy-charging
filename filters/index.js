export function defaultValue(value, unit) {
  if (value || value === 0) {
    return `${value}${unit}`
  }
  return '--'
}

export function formatTime(value) {
  value = +value
  let h = Math.floor(value / 3600);
  h = format(h, '时');
  let m = Math.floor((value / 60) % 60);
  m = format(m, '分');
  let s = Math.floor(value % 60);
  s = format(s, '秒', '00秒');
  return `${h}${m}${s}`;
}

function format(value, unit, defaultValue = '') {
  if (value) {
    value = value < 10 ? '0' + value : value;
    return `${value}${unit}`
  }
  return defaultValue
}


