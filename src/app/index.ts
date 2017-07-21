import { Tetris } from './tetris';
import { getPiece } from "./piece";


export const game = new Tetris();

setInterval(function () {
  if (!game.paused) {
    if (!game.movePiece({ y: 1 })) {
      game.nextPiece();
    }
  }
}, 1000);