export interface Color {
  red: number,
  green: number,
  blue: number,
  alpha: number
}

export interface PieceTemplate {
  frames: boolean[][][];
}

export interface PieceStyle {
  color: Color;
  borderColor: Color;
}

export type PieceType = 'T' | 'J' | 'L' | 'S' | 'Z' | 'I' | 'O';

const WHITE = {
  red: 255, green: 255, blue: 255, alpha: 1
}

export const PIECE_THEMES = {
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

function toMatrix(frame: string[]) {
  return frame.map(x => {
    return x.split('').map(x => x !== ' ');
  })
}

export const PIECE_TEMPLATES = {
  T: {
    frames: [
      [
        '   ',
        'XXX',
        ' X '
      ],
      [
        ' X ',
        ' XX',
        ' X '
      ],
      [
        ' X ',
        'XXX',
        '   '
      ],
      [
        ' X ',
        'XX ',
        ' X '
      ],
    ].map(toMatrix)
  },
  L: {
    frames: [
      [
        ' X ',
        ' X ',
        ' XX'
      ],
      [
        '  X',
        'XXX',
        '   '
      ],
      [
        'XX ',
        ' X ',
        ' X '
      ],
      [
        '   ',
        'XXX',
        'X  '
      ],
    ].map(toMatrix)
  },
  J: {
    frames: [
      [
        ' X ',
        ' X ',
        'XX '
      ],
      [
        '   ',
        'XXX',
        '  X'
      ],
      [
        ' XX',
        ' X ',
        ' X '
      ],
      [
        'X  ',
        'XXX',
        '   '
      ],
    ].map(toMatrix)
  },
  I: {
    frames: [
      [
        '  X ',
        '  X ',
        '  X ',
        '  X '
      ],
      [
        '    ',
        '    ',
        'XXXX',
        '    '
      ],
      [
        ' X  ',
        ' X  ',
        ' X  ',
        ' X  '
      ],
      [
        '    ',
        'XXXX',
        '    ',
        '    '
      ],
    ].map(toMatrix)
  },
  O: {
    frames: [
      [
        'XX',
        'XX'
      ],
    ].map(toMatrix)
  },
  S: {
    frames: [
      [
        '   ',
        'XX ',
        ' XX'
      ],
      [
        ' X ',
        'XX ',
        'X  '
      ],
      [
        'XX ',
        ' XX',
        '   '
      ],
      [
        '  X',
        ' XX',
        ' X '
      ],
    ].map(toMatrix)
  },
  Z: {
    frames: [
      [
        '   ',
        ' XX',
        'XX '
      ],
      [
        ' X ',
        ' XX',
        '  X'
      ],
      [
        ' XX',
        'XX ',
        '   '
      ],
      [
        'X  ',
        'XX ',
        ' X '
      ]
    ].map(toMatrix)
  }
}