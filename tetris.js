const PIECES = {
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
  }
}

const KEY_CODES = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
for (let key of Object.keys(PIECES)) {
  KEY_CODES[key.charCodeAt(0)] = key;
}

const HEIGHT = window.innerHeight;
const WIDTH = window.innerHeight * 1 / 2;
const BLOCK_SIZE = WIDTH / 10;
const LINE_WIDTH = BLOCK_SIZE / 10;
const LINE_WIDTH_HALF = LINE_WIDTH / 2;

function getCanvas() {
  const canvas = document.createElement('canvas');

  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  const container = document.createElement('div');
  container.appendChild(canvas);
  document.body.appendChild(container);
  return canvas;
}


function drawPiece(piece) {
  const pieceTemplate = PIECES[piece.shape];
  const frames = pieceTemplate.frames;
  const frame = frames[piece.rotation % frames.length];
  const size = pieceTemplate.size;

  const px = piece.x;
  const py = piece.y;

  context.fillStyle = pieceTemplate.color;
  context.strokeStyle = '#fff';
  context.lineWidth = LINE_WIDTH;

  for (let x = 0, c = 0; x < size; x++) {
    for (let y = 0; y < size; y++ , c++) {
      const filled = frame.charAt(c) !== ' ';
      if (filled) {
        const resX = (px + x) * BLOCK_SIZE;
        const resY = (py + y) * BLOCK_SIZE;
        context.fillRect(
          resX + .5,
          resY + .5,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1);
        context.strokeRect(
          resX + LINE_WIDTH_HALF + .5,
          resY + LINE_WIDTH_HALF + .5,
          BLOCK_SIZE - LINE_WIDTH - 1,
          BLOCK_SIZE - LINE_WIDTH - 1
        );
      }
    }
  }
}


const canvas = getCanvas();
const context = canvas.getContext('2d');
const piece = {
  shape: 'T',
  rotation: 0,
  x: 5,
  y: 0
}

function clearScreen() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function onInput(e) {
  switch (e.keyCode) {
    case KEY_CODES.LEFT: piece.x -= 1; break;
    case KEY_CODES.RIGHT: piece.x += 1; break;
    case KEY_CODES.UP: piece.y -= 1; break;
    case KEY_CODES.DOWN: piece.y += 1; break;
    case KEY_CODES.SPACE: piece.rotation += 1; break;
    default:
      if (KEY_CODES[e.keyCode]) {
        piece.shape = KEY_CODES[e.keyCode];
      }
  }
  clearScreen();
  drawPiece(piece);
}


document.body.addEventListener('keydown', onInput)
onInput({});