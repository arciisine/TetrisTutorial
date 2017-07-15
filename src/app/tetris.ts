import { PIECE_TEMPLATES, PIECE_THEMES, PieceType, Color, PieceStyle, PieceTemplate } from './pieces';
import { KEY_CODES } from './key-codes';
import { getCanvas } from './canvas';
import { BLOCK_SIZE, LINE_WIDTH, LINE_WIDTH_HALF, BLOCKS_WIDE, BLOCKS_HIGH } from './dimensions';
import { initMusic } from './audio';

interface Location {
  x?: number;
  y?: number;
  rotation?: number;
}

interface Piece extends PieceTemplate, PieceStyle, Location { }

const canvas = getCanvas();
const context = canvas.getContext('2d');
const music = initMusic();
music.playbackRate = 1;

function toRGB(color: Color) {
  return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`;
}

function drawPiece(piece: Piece) {
  const frames = piece.frames;
  const frame = frames[piece.rotation % frames.length];
  const size = frame.length;

  const px = piece.x;
  const py = piece.y;

  context.fillStyle = toRGB(piece.color);
  context.strokeStyle = toRGB(piece.borderColor);
  context.lineWidth = LINE_WIDTH;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const filled = frame[x][y];
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

function changePiece(piece: Piece, location: Location) {
  if (location.x !== undefined) {
    piece.x += location.x;
  }
  if (location.y !== undefined) {
    piece.y += location.y;
  }
  if (location.rotation !== undefined) {
    piece.rotation += location.rotation;
  }
}

function clearScreen() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function getPiece(shape: PieceType) {
  let tpl = PIECE_TEMPLATES[shape];
  let style = PIECE_THEMES.STANDARD[shape];
  let piece: Partial<Piece> = {};
  piece.x = 0;
  piece.y = 0;
  piece.rotation = 0;
  piece.frames = tpl.frames;
  piece.color = { ...style.color };
  piece.borderColor = { ...style.borderColor };
  return piece as Piece;
}

function onKeyPress(piece: Piece, key: number) {
  switch (key) {
    case KEY_CODES.LEFT: changePiece(piece, { x: -1 }); break;
    case KEY_CODES.RIGHT: changePiece(piece, { x: 1 }); break;
    case KEY_CODES.UP: changePiece(piece, { y: -1 }); break;
    case KEY_CODES.DOWN: changePiece(piece, { y: 1 }); break;
    case KEY_CODES.SPACE: changePiece(piece, { rotation: 1 }); break;
    case KEY_CODES.ENTER:
      paused = !paused;
      if (paused) {
        music.pause();
      } else {
        music.play();
      }
      break;
    default:
      if (KEY_CODES[key]) {
        piece = getPiece(KEY_CODES[key]);
      }
  }
}

let piece = getPiece('T');
let paused = false;

function drawScreen() {
  clearScreen();
  drawPiece(piece);
  piece.color.alpha = (piece.color.alpha + .001) % 1;
  piece.borderColor.alpha = (piece.borderColor.alpha + .001) % 1;
  window.requestAnimationFrame(drawScreen);
}

document.body.addEventListener('keydown', function (e: KeyboardEvent) {
  onKeyPress(piece, e.keyCode);
})

setInterval(function () {
  if (!paused) {
    changePiece(piece, { y: 1 })
  }
}, 1000);

window.requestAnimationFrame(drawScreen);
//music.play();