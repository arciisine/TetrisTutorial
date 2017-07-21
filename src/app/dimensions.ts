export const BLOCKS_WIDE = 10;
export const BLOCKS_HIGH = 20;


export let HEIGHT = window.innerHeight;
export let WIDTH = HEIGHT * (BLOCKS_WIDE / BLOCKS_HIGH);
export let BLOCK_SIZE = HEIGHT / BLOCKS_HIGH;
if (WIDTH > window.innerWidth) {
  WIDTH = window.innerWidth;
  HEIGHT = WIDTH * (BLOCKS_HIGH / BLOCKS_WIDE);
  BLOCK_SIZE = WIDTH / BLOCKS_WIDE;
}


export const LINE_WIDTH = BLOCK_SIZE / 10;
export const LINE_WIDTH_HALF = LINE_WIDTH / 2;