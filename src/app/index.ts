import { Tetris } from './tetris';


export const game = new Tetris();

setInterval(function () {
  if (!game.paused) {
    game.movePiece({ y: 1 })
  }
}, 1000);