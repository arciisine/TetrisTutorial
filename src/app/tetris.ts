import { PIECES, PieceType, PieceTemplate } from './pieces';
import { THEMES, PieceStyle } from './theme';
import { KEY_CODES } from './key-codes';
import { getCanvas } from './canvas';
import { BLOCK_SIZE, LINE_WIDTH, LINE_WIDTH_HALF, BLOCKS_WIDE, BLOCKS_HIGH } from './dimensions';
import { initMusic } from './audio';
import { buildBoard, drawBoard } from './board';

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
  let tpl = PIECES[shape];
  let style = THEMES.STANDARD[shape];
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
let board = buildBoard(BLOCKS_WIDE, BLOCKS_HIGH);

function drawScreen() {
  clearScreen();
  drawBoard(context, board);
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