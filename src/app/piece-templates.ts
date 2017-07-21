export interface PieceTemplate {
  frames: boolean[][][];
}

function toMatrix(frame: string[]) {
  return frame.map(x => {
    return x.split('').map(x => x !== ' ');
  })
}

export const PIECES = {
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

export type PieceType = keyof (typeof PIECES);
const SHAPES = Object.keys(PIECES) as PieceType[]

export function getRandomShape() {
  return SHAPES[parseInt(`${SHAPES.length * Math.random()}`, 10)]
}