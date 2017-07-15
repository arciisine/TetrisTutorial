import { PIECES, PieceType, PieceColor, PieceTemplate } from './pieces';
import { KEY_CODES } from './key-codes';
import { getCanvas } from './canvas';
import { BLOCK_SIZE, LINE_WIDTH, LINE_WIDTH_HALF, BLOCKS_WIDE, BLOCKS_HIGH } from './dimensions';

interface Piece extends PieceTemplate {
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

function toRGB(color: PieceColor) {
  return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`;
}

function drawPiece(piece: Piece) {
  const frames = piece.frames;
  const frame = frames[piece.rotation % frames.length];
  const size = piece.size;

  const px = piece.x;
  const py = piece.y;

  context.fillStyle = toRGB(piece.color);
  context.strokeStyle = toRGB(piece.borderColor);
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

function checkBoundary(piece: Piece) {

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


let paused = false;

function getPiece(shape: PieceType) {
  let tpl = PIECES[shape];
  let piece: Partial<Piece> = {};
  piece.x = 0;
  piece.y = 0;
  piece.rotation = 0;
  piece.frames = tpl.frames;
  piece.size = tpl.size;
  piece.color = { ...tpl.color };
  piece.borderColor = { ...tpl.borderColor };
  return piece as Piece;
}

let piece = getPiece('T');

function onInput(e: KeyboardEvent) {
  switch (e.keyCode) {
    case KEY_CODES.LEFT: movePiece(piece, { x: -1 }); break;
    case KEY_CODES.RIGHT: movePiece(piece, { x: 1 }); break;
    case KEY_CODES.UP: movePiece(piece, { y: -1 }); break;
    case KEY_CODES.DOWN: movePiece(piece, { y: 1 }); break;
    case KEY_CODES.SPACE: piece.rotation += 1; break;
    case KEY_CODES.ENTER: paused = !paused; break;
    default:
      if (KEY_CODES[e.keyCode]) {
        piece = getPiece(KEY_CODES[e.keyCode]);
      }
  }
}

function drawScreen() {
  clearScreen();
  drawPiece(piece);
  piece.color.alpha = (piece.color.alpha + .001) % 1;
  piece.borderColor.alpha = (piece.borderColor.alpha + .001) % 1;
  window.requestAnimationFrame(drawScreen);
}

document.body.addEventListener('keydown', onInput)

setInterval(function () {
  if (!paused) {
    movePiece(piece, { y: 1 })
  }
}, 1000);

window.requestAnimationFrame(drawScreen);