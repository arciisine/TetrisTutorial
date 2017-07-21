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
  piece = getPiece();
  paused = false;
  board = buildBoard(BLOCKS_WIDE, BLOCKS_HIGH);

  constructor() {
    this.onKeyPress = this.onKeyPress.bind(this)
    this.drawScreen = this.drawScreen.bind(this);

    this.music.playbackRate = 1;
    document.addEventListener('keydown', this.onKeyPress);
    window.requestAnimationFrame(this.drawScreen);
    if (this.musicEnabled) {
      this.music.play();
    }
  }

  clearScreen() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  nextPiece() {
    this.piece = getPiece();
  }

  drawPiece(piece: Piece, action: 'test'): boolean;
  drawPiece(piece: Piece, action: 'set' | 'clear'): void;
  drawPiece(piece: Piece, action: 'set' | 'clear' | 'test'): void | boolean {
    const frame = piece.template.frames[piece.location.rotation % piece.template.frames.length];
    const size = frame.length;
    const px = piece.location.x;
    const py = piece.location.y;


    if (action !== 'test') {
      const add = action === 'set';
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (frame[x][y]) {
            this.board[py + y][px + x] = add ? piece.style : null;
          }
        }
      }
    } else {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (frame[x][y]) {
            const bx = x + px;
            const by = y + py;
            if (bx < 0 || py < 0 || bx >= BLOCKS_WIDE || by >= BLOCKS_HIGH || this.board[by][bx] !== null) {
              return false;
            }
          }
        }
      }
      return true;
    }
  }

  movePiece(location: Location) {
    this.drawPiece(this.piece, 'clear');

    const ploc = this.piece.location;
    const loc = Object.assign({}, ploc);


    if (location.x !== undefined) {
      ploc.x += location.x;
    }
    if (location.y !== undefined) {
      ploc.y += location.y;
    }
    if (location.rotation !== undefined) {
      ploc.rotation += location.rotation;
    }

    if (!this.drawPiece(this.piece, 'test')) {
      this.piece.location = loc;
      return false;
    }

    this.drawPiece(this.piece, 'set');
    return true;
  }

  onKeyPress(e: KeyboardEvent) {
    let key = e.keyCode;
    switch (key) {
      case KEY_CODES.LEFT: this.movePiece({ x: -1 }); break;
      case KEY_CODES.RIGHT: this.movePiece({ x: 1 }); break;
      case KEY_CODES.UP: this.movePiece({ y: -1 }); break;
      case KEY_CODES.DOWN: this.movePiece({ y: 1 }); break;
      case KEY_CODES.SPACE: this.movePiece({ rotation: 1 }); break;
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

  drawScreen() {
    this.clearScreen();
    drawBoard(this.context, this.board);
    window.requestAnimationFrame(this.drawScreen);
  }
}