import { PieceStyle } from './theme';
import { BLOCK_SIZE, LINE_WIDTH, LINE_WIDTH_HALF } from "./dimensions";

export type Board = PieceStyle[][];

export function buildBoard(w: number, h: number) {
  let board: Board = [];
  for (let y = 0; y < h; y += 1) {
    let row: PieceStyle[] = [];
    for (let x = 0; x < w; x += 1) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
}

export function drawBoard(context: CanvasRenderingContext2D, board: Board) {

  let h = board.length;
  let w = board[0].length;

  context.lineWidth = LINE_WIDTH;

  for (let y = 0; y < h; y += 1) {
    const row = board[y];
    for (let x = 0; x < w; x++) {
      const block = row[x];
      const filled = block !== null;
      if (filled) {
        context.fillStyle = block.color.toString();
        context.strokeStyle = block.borderColor.toString();

        const resX = x * BLOCK_SIZE;
        const resY = y * BLOCK_SIZE;
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