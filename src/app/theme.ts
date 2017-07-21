export class Color {
  private _red: number;
  private _green: number;
  private _blue: number;
  private _alpha: number;
  private _rgba: string;

  constructor(r: number, g: number, b: number, a = 1) {
    this._red = r;
    this._green = g;
    this._blue = b;
    this._alpha = a;
  }

  set red(v: number) {
    this._red = v;
    this._rgba = null;
  }

  get red() {
    return this._red;
  }

  set blue(v: number) {
    this._blue = v;
    this._rgba = null;
  }

  get blue() {
    return this._blue;
  }

  set green(v: number) {
    this._green = v;
    this._rgba = null;
  }

  get green() {
    return this._green;
  }

  set alpha(v: number) {
    this._alpha = v;
    this._rgba = null;
  }

  get alpha() {
    return this._alpha;
  }

  toString() {
    if (!this._rgba) {
      this._rgba = `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
    return this._rgba;
  }

  clone() {
    return new Color(this._red, this._green, this._blue, this._alpha);
  }
}

export interface PieceStyle {
  color: Color;
  borderColor: Color;
}

const WHITE = new Color(255, 255, 255)

export const THEMES = {
  STANDARD: {
    T: {
      color: new Color(255, 165, 0),
      borderColor: WHITE,
    },
    L: {
      color: new Color(255, 0, 0),
      borderColor: WHITE,
    },
    J: {
      color: new Color(0, 0, 255),
      borderColor: WHITE,
    },
    I: {
      color: new Color(0, 255, 0),
      borderColor: WHITE,
    },
    O: {
      color: new Color(80, 80, 80),
      borderColor: WHITE,
    },
    S: {
      color: new Color(80, 0, 80),
      borderColor: WHITE,
    },
    Z: {
      color: new Color(255, 255, 0),
      borderColor: WHITE,
    }
  }
}