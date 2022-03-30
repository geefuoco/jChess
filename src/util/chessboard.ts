import kingBlack from "../assets/king_black.png";
import kingWhite from "../assets/king_white.png";
import bishopBlack from "../assets/bishop_black.png";
import bishopWhite from "../assets/bishop_white.png";
import knightBlack from "../assets/knight_black.png";
import knightWhite from "../assets/knight_white.png";
import pawnBlack from "../assets/pawn_black.png";
import pawnWhite from "../assets/pawn_white.png";
import queenBlack from "../assets/queen_black.png";
import queenWhite from "../assets/queen_white.png";
import rookBlack from "../assets/rook_black.png";
import rookWhite from "../assets/rook_white.png";

export const pieceMap = {
  k: kingBlack,
  K: kingWhite,
  b: bishopBlack,
  B: bishopWhite,
  n: knightBlack,
  N: knightWhite,
  p: pawnBlack,
  P: pawnWhite,
  q: queenBlack,
  Q: queenWhite,
  r: rookBlack,
  R: rookWhite
};

export class ChessBoard {
  board: string[][];
  constructor() {
    this.board = this.createChessBoard(8);
  }

  private createChessBoard(sideLength: number): string[][] {
    const board = [];
    for (let i = 0; i < sideLength; i++) {
      board[i] = [] as string[];
      for (let j = 0; j < sideLength; j++) {
        board[i].push("");
      }
    }
    return board;
  }

  hasPiece(x: number, y: number): boolean {
    return this.board[x][y] !== "";
  }
}
