export function toRGB(color: Color) {
  return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`;
}

export interface Color {
  red: number,
  green: number,
  blue: number,
  alpha: number
}
export interface PieceStyle {
  color: Color;
  borderColor: Color;
}

const WHITE = {
  red: 255, green: 255, blue: 255, alpha: 1
}

export const THEMES = {
  STANDARD: {
    T: {
      color: { red: 255, green: 165, blue: 0, alpha: 1 },
      borderColor: WHITE,
    },
    L: {
      color: { red: 255, green: 0, blue: 0, alpha: 1 },
      borderColor: WHITE,
    },
    J: {
      color: { red: 0, green: 0, blue: 255, alpha: 1 },
      borderColor: WHITE,
    },
    I: {
      color: { red: 0, green: 255, blue: 0, alpha: 1 },
      borderColor: WHITE,
    },
    O: {
      color: { red: 80, green: 80, blue: 80, alpha: 1 },
      borderColor: WHITE,
    },
    S: {
      color: { red: 80, green: 0, blue: 80, alpha: 1 },
      borderColor: WHITE,
    },
    Z: {
      color: { red: 255, green: 255, blue: 0, alpha: 1 },
      borderColor: WHITE,
    }
  }
}