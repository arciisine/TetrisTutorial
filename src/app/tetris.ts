import { KEY_CODES } from './key-codes';
import { getCanvas } from './canvas';
import { BLOCKS_WIDE, BLOCKS_HIGH } from './dimensions';
import { initMusic } from './audio';
import { buildBoard, drawBoard, Board } from './board';
import { getPiece, Piece, Location } from './piece';
import { PieceTemplate, PieceTemplateFrame } from "./piece-templates";

export class Tetris {

  readonly canvas = getCanvas();
  readonly context = this.canvas.getContext('2d');
  readonly music = initMusic();

  musicEnabled = false;
  piece: Piece;
  paused = false;
  board = buildBoard(BLOCKS_WIDE, BLOCKS_HIGH);
  lastGravity: number = Date.now();

  constructor() {
    this.onKeyPress = this.onKeyPress.bind(this)
    this.drawScreen = this.drawScreen.bind(this);

    this.music.playbackRate = 1;
    document.addEventListener('keydown', this.onKeyPress);
    window.requestAnimationFrame(this.drawScreen);
    if (this.musicEnabled) {
      this.music.play();
    }
    this.getNextPiece();
  }

  clearScreen() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  finishPiece() {
    // TODO: How do we finish?
  }

  getNextPiece() {
    // TODO: What does this look like?
  }

  drawPiece(add: boolean = true) {
    const frame = this.piece.template.frames[Math.abs(this.piece.location.rotation % this.piece.template.frames.length)];
    const size = frame.length;
    const px = this.piece.location.x;
    const py = this.piece.location.y;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (frame[x][y]) {
          this.board[py + y][px + x] = add ? this.piece.style : null;
        }
      }
    }
  }

  testPiece() {
    // TODO: What should we do here?
    return false;
  }

  movePiece(location: Location) {
    // TODO: We need to move the piece
  }

  onKeyPress(e: KeyboardEvent) {
    let key = e.keyCode;
    let moved = false;
    if (!this.paused) {
      moved = true;
      switch (key) {
        case KEY_CODES.LEFT: this.movePiece({ x: -1 }); break;
        case KEY_CODES.RIGHT: this.movePiece({ x: 1 }); break;
        case KEY_CODES.DOWN: this.movePiece({ y: 1 }); break;
        case KEY_CODES.UP: this.movePiece({ rotation: -1 }); break;
        case KEY_CODES.SPACE: this.movePiece({ rotation: 1 }); break;
        default:
          moved = false;
      }
    }
    if (!moved) {
      switch (key) {
        case KEY_CODES.M:
          this.musicEnabled = !this.musicEnabled
          if (this.musicEnabled) {
            this.music.play();
          } else {
            this.music.pause();
          }
          break;
        case KEY_CODES.ENTER:
          this.paused = !this.paused;
          if (this.musicEnabled) {
            if (this.paused) {
              this.music.pause();
            } else {
              this.music.play();
            }
          }
          break;
      }
    }
  }

  drawScreen() {
    this.clearScreen();
    if (!this.paused) {
      if ((Date.now() - this.lastGravity) > 1000) {
        this.movePiece({ y: 1 });
        this.lastGravity = Date.now();
      }
    }
    drawBoard(this.context, this.board);
    window.requestAnimationFrame(this.drawScreen);
  }
}