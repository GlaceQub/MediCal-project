/**
 * Convert a number between min and max to a hex color string based on current value.
 *
 * @param number The current value
 * @param min The minimum value default is 1
 * @param max The maximum value default is 10
 * @param colors The colors to use for the gradient
 * 
 * @returns The hex color string corresponding to the current value
 */
const number2color = (number: number, min: number = 1, max: number = 10, colors: string[]) => {
  if (number < min || number > max) {
    throw new Error(`Number ${number} is out of range (${min}-${max})`)
  }

  if (colors.length < 2) {
    throw new Error("At least two colors are required for the gradient")
  }

  const range = max - min;
  const index = Math.floor(((number - min) / range) * (colors.length - 1));
  const color = colors[index];

  return color;
}

export default number2color
