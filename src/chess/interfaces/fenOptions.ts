import { ChessBoard } from "../board/chessboard";

export interface FenOptions {
  pieces: string;
  activeColor: "w" | "b";
  castling: string;
  enPassent: string;
  halfMove: number;
  fullMove: number;
  board: ChessBoard;
}
