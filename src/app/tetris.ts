import { PIECES, PieceType } from './pieces';
import { KEY_CODES } from './key-codes';
import { getCanvas } from './canvas';
import { BLOCK_SIZE, LINE_WIDTH, LINE_WIDTH_HALF, BLOCKS_WIDE, BLOCKS_HIGH } from './dimensions';

interface Piece {
  shape: PieceType;
  rotation: number;
  x: number;
  y: number;
}

interface Direction {
  x?: number;
  y?: number;
}

const canvas = getCanvas();
const context = canvas.getContext('2d');
let piece: Piece = {
  shape: 'T',
  rotation: 0,
  x: 5,
  y: 0
}

function drawPiece(piece: Piece) {
  const pieceTemplate = PIECES[piece.shape];
  const frames = pieceTemplate.frames;
  const frame = frames[piece.rotation % frames.length];
  const size = pieceTemplate.size;

  const px = piece.x;
  const py = piece.y;

  context.fillStyle = pieceTemplate.color;
  context.strokeStyle = 'pink';
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

function movePiece(piece: Piece, direction: Direction) {
  if (direction.x !== undefined) {
    piece.x += direction.x;
    if (piece.x < 0) {
      piece.x = 0;
    } else if (piece.x >= BLOCKS_WIDE) {
      piece.x = BLOCKS_WIDE - 1;
    }
  }
  if (direction.y !== undefined) {
    piece.y += direction.y;
    if (piece.y < 0) {
      piece.y = 0;
    } else if (piece.y >= BLOCKS_HIGH) {
      piece.y = BLOCKS_HIGH - 1;
    }
  }
}

function clearScreen() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function onInput(e: KeyboardEvent) {
  switch (e.keyCode) {
    case KEY_CODES.LEFT: movePiece(piece, { x: -1 }); break;
    case KEY_CODES.RIGHT: movePiece(piece, { x: 1 }); break;
    case KEY_CODES.UP: movePiece(piece, { y: -1 }); break;
    case KEY_CODES.DOWN: movePiece(piece, { y: 1 }); break;
    case KEY_CODES.SPACE: piece.rotation += 1; break;
    default:
      if (KEY_CODES[e.keyCode]) {
        piece.shape = KEY_CODES[e.keyCode];
      }
  }
}

function drawScreen() {
  clearScreen();
  drawPiece(piece);
  window.requestAnimationFrame(drawScreen);
}

document.body.addEventListener('keydown', onInput)

setInterval(function () {
  movePiece(piece, { y: 1 })
}, 1000);

window.requestAnimationFrame(drawScreen);