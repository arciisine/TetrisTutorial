export interface PieceColor {
  red: number,
  green: number,
  blue: number,
  alpha: number
}

export interface PieceTemplate {
  color: PieceColor,
  borderColor: PieceColor,
  frames: string[],
  size: number;
}

const WHITE = {
  red: 255, green: 255, blue: 255, alpha: 1
}

export const PIECES: { [key: string]: PieceTemplate } = {
  T: {
    color: { red: 255, green: 165, blue: 0, alpha: 1 },
    borderColor: WHITE,
    size: 3,
    frames: [
      '   ' +
      'XXX' +
      ' X ',

      ' X ' +
      ' XX' +
      ' X ',

      ' X ' +
      'XXX' +
      '   ',

      ' X ' +
      'XX ' +
      ' X ',
    ]
  },
  L: {
    color: { red: 255, green: 0, blue: 0, alpha: 1 },
    borderColor: WHITE,
    size: 3,
    frames: [
      ' X ' +
      ' X ' +
      ' XX',

      '  X' +
      'XXX' +
      '   ',

      'XX ' +
      ' X ' +
      ' X ',

      '   ' +
      'XXX' +
      'X  ',
    ]
  },
  J: {
    color: { red: 0, green: 0, blue: 255, alpha: 1 },
    borderColor: WHITE,
    size: 3,
    frames: [
      ' X ' +
      ' X ' +
      'XX ',

      '   ' +
      'XXX' +
      '  X',

      ' XX' +
      ' X ' +
      ' X ',

      'X  ' +
      'XXX' +
      '   ',
    ]
  },
  I: {
    color: { red: 0, green: 255, blue: 0, alpha: 1 },
    borderColor: WHITE,
    size: 4,
    frames: [
      '  X ' +
      '  X ' +
      '  X ' +
      '  X ',

      '    ' +
      '    ' +
      'XXXX' +
      '    ',

      ' X  ' +
      ' X  ' +
      ' X  ' +
      ' X  ',

      '    ' +
      'XXXX' +
      '    ' +
      '    ',
    ]
  },
  O: {
    color: { red: 80, green: 80, blue: 80, alpha: 1 },
    borderColor: WHITE,
    size: 2,
    frames: [
      'XX' +
      'XX',
    ]
  },
  S: {
    color: { red: 80, green: 0, blue: 80, alpha: 1 },
    borderColor: WHITE,
    size: 3,
    frames: [
      '   ' +
      'XX ' +
      ' XX',

      ' X ' +
      'XX ' +
      'X  ',

      'XX ' +
      ' XX' +
      '   ',

      '  X' +
      ' XX' +
      ' X ',
    ],
  },
  Z: {
    color: { red: 255, green: 255, blue: 0, alpha: 1 },
    borderColor: WHITE,
    size: 3,
    frames: [
      '   ' +
      ' XX' +
      'XX ',

      ' X ' +
      ' XX' +
      '  X',

      ' XX' +
      'XX ' +
      '   ',

      'X  ' +
      'XX ' +
      ' X ',
    ]
  }
}

export type PieceType = 'T' | 'J' | 'L' | 'S' | 'Z' | 'I' | 'O';
