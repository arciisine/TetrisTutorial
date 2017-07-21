import { PIECES, PieceType, PieceTemplate } from './piece-templates';
import { THEMES, PieceStyle } from './theme';
import { KEY_CODES } from './key-codes';
import { getCanvas } from './canvas';
import { BLOCK_SIZE, LINE_WIDTH, LINE_WIDTH_HALF, BLOCKS_WIDE, BLOCKS_HIGH } from './dimensions';
import { initMusic } from './audio';
import { buildBoard, drawBoard } from './board';
import { getPiece, Piece, movePiece } from "./piece";

const canvas = getCanvas();
const context = canvas.getContext('2d');
const music = initMusic();
music.playbackRate = 1;

function clearScreen() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function onKeyPress(e: KeyboardEvent) {
  let key = e.keyCode;
  switch (key) {
    case KEY_CODES.LEFT: movePiece(board, piece, { x: -1 }); break;
    case KEY_CODES.RIGHT: movePiece(board, piece, { x: 1 }); break;
    case KEY_CODES.UP: movePiece(board, piece, { y: -1 }); break;
    case KEY_CODES.DOWN: movePiece(board, piece, { y: 1 }); break;
    case KEY_CODES.SPACE: movePiece(board, piece, { rotation: 1 }); break;
    case KEY_CODES.ENTER:
      paused = !paused;
      if (paused) {
        music.pause();
      } else {
        music.play();
      }
      break;
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

document.body.addEventListener('keydown', onKeyPress);

setInterval(function () {
  if (!paused) {
    movePiece(board, piece, { y: 1 })
  }
}, 1000);

window.requestAnimationFrame(drawScreen);
//music.play();