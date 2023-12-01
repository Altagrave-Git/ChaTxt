export function adjustColor(hexColor) {
  // Convert hex to RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  let cols = [r, g, b];

  const max = Math.max(...cols);
  if (max < 180) {
    cols.forEach((value, index) => (cols[index] += (100 - cols[index] / 3) * 1.25));
  } else {
    cols.forEach((value, index) => (cols[index] = (cols[index] - 20) * 0.85));
  }

  [r, g, b] = cols;

  // Ensure RGB values are within valid range (0 to 255)
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert RGB back to hex
  const result = '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

  return result;
}


