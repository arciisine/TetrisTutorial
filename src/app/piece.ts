import { PieceStyle, THEMES } from "./theme";
import { PieceTemplate, PieceType, PIECES } from "./piece-templates";
import { Board } from "./board";

interface Location {
  x?: number;
  y?: number;
  rotation?: number;
}

export interface Piece extends PieceTemplate, PieceStyle, Location { }

export function changePiece(piece: Piece, location: Location) {
  if (location.x !== undefined) {
    piece.x += location.x;
  }
  if (location.y !== undefined) {
    piece.y += location.y;
  }
  if (location.rotation !== undefined) {
    piece.rotation += location.rotation;
  }
}

export function drawPiece(context: CanvasRenderingContext2D, board: Board, piece: Piece) {

}

export function getPiece(shape: PieceType) {
  let tpl = PIECES[shape];
  let style = THEMES.STANDARD[shape];
  let piece: Partial<Piece> = {};
  piece.x = 0;
  piece.y = 0;
  piece.rotation = 0;
  piece.frames = tpl.frames;
  piece.color = { ...style.color };
  piece.borderColor = { ...style.borderColor };
  return piece as Piece;
}