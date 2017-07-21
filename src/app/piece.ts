import { PieceStyle, THEMES } from "./theme";
import { PieceTemplate, PieceType, PIECES, getRandomShape } from "./piece-templates";
import { Board } from "./board";

export interface Location {
  x?: number;
  y?: number;
  rotation?: number;
}

export interface Piece extends PieceTemplate, PieceStyle, Location { }

export function getPiece(shape?: PieceType) {
  if (!shape) {
    shape = getRandomShape();
  }
  let tpl = PIECES[shape];
  let style = THEMES.STANDARD[shape];
  let piece: Partial<Piece> = {};
  piece.x = 0;
  piece.y = 0;
  piece.rotation = 0;
  piece.frames = tpl.frames;
  piece.color = style.color.clone()
  piece.borderColor = style.borderColor.clone();
  return piece as Piece;
}