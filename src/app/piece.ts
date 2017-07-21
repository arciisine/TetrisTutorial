import { PieceStyle, THEMES } from "./theme";
import { PieceTemplate, PieceType, PIECES, getRandomShape } from "./piece-templates";
import { Board } from "./board";

export interface Location {
  x?: number;
  y?: number;
  rotation?: number;
}

export interface Piece {
  template: PieceTemplate;
  style: PieceStyle;
  location: Location;
}

export function getPiece(shape?: PieceType) {
  if (!shape) {
    shape = getRandomShape();
  }
  let style = THEMES.STANDARD[shape];
  let piece: Piece = {
    location: { x: 0, y: 0, rotation: 0 },
    template: PIECES[shape],
    style: {
      color: style.color.clone(),
      borderColor: style.borderColor.clone()
    }
  };
  return piece;
}