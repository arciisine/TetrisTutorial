export const PIECES = {
  T: {
    color: 'orange',
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
    color: 'red',
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
    color: 'blue',
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
    color: 'green',
    size: 4,
    frames: [
      '  X ' +
      '  X ' +
      '  X ' +
      '  X ',

      '    ' +
      '    ' +
      'XXXX' +
      '    '
    ]
  },
  O: {
    color: 'gray',
    size: 2,
    frames: [
      'XX' +
      'XX',
    ]
  },
  S: {
    color: 'purple',
    size: 3,
    frames: [
      '   ' +
      'XX ' +
      ' XX',

      ' X ' +
      'XX ' +
      'X  ',
    ]
  },
  Z: {
    color: 'yellow',
    size: 3,
    frames: [
      '   ' +
      ' XX' +
      'XX ',

      ' X ' +
      ' XX' +
      '  X'
    ]
  },
  X: {
    color: 'brown',
    size: 3,
    frames: [
      'X X' +
      ' X ' +
      'X X',

      ' X ' +
      'XXX' +
      ' X '
    ]
  }
}

export type PieceType = 'T' | 'J' | 'L' | 'S' | 'Z' | 'I' | 'O';
