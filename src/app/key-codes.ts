import { PIECE_TEMPLATES } from './pieces.js';

export const KEY_CODES: { [key: string]: any } = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13
}
for (let key of Object.keys(PIECE_TEMPLATES)) {
  KEY_CODES[key.charCodeAt(0)] = key;
}
