/**
 * Convert a hex color string to an RGBA color string.
 *
 * @param hex   The hex string, either 6 or 3 characters long, can optionally include the # prefix.
 * @param alpha The alpha value, defaults to fully opaque.
 */
const hex2rgba = (hex: string, alpha: number = 1) => {
  hex = hex.replace('#', '')

  const matches = hex.match(/(..?)(..?)(..?)/)

  if (!matches || matches.length !== 4) {
    throw new Error(`Cannot convert ${hex} to a rgba value since it is not a hex string.`)
  }

  const [r, g, b] = matches
    .slice(1)
    .map(x => (x.length === 1 ? `${x}${x}` : x))
    .map(x => parseInt(x, 16))

  return `rgba(${r},${g},${b},${alpha})`
}

export default hex2rgba
