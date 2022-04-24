import kingBlack from "../../assets/king_black.png";
import kingWhite from "../../assets/king_white.png";
import bishopBlack from "../../assets/bishop_black.png";
import bishopWhite from "../../assets/bishop_white.png";
import knightBlack from "../../assets/knight_black.png";
import knightWhite from "../../assets/knight_white.png";
import pawnBlack from "../../assets/pawn_black.png";
import pawnWhite from "../../assets/pawn_white.png";
import queenBlack from "../../assets/queen_black.png";
import queenWhite from "../../assets/queen_white.png";
import rookBlack from "../../assets/rook_black.png";
import rookWhite from "../../assets/rook_white.png";
import { Position } from "../interfaces/position";
import { Piece } from "../pieces/piece";
import { Map } from "../interfaces/map";
import { Capture } from "../moves/capture";
import { Pawn } from "../pieces/pawn/pawn";
import { Castle } from "../moves/castle";
import { Move } from "../moves/move";

export const pieceMap: Map = {
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

type Dict = {
  [key: string]: boolean | undefined;
};

export class ChessBoard {
  board: (Piece | null)[][];
  pieces: Piece[];
  constructor() {
    this.board = this.createChessBoard(8);
    this.pieces = [];
  }

  private createChessBoard(sideLength: number): (Piece | null)[][] {
    const board = [];
    for (let i = 0; i < sideLength; i++) {
      board[i] = [] as (Piece | null)[];
      for (let j = 0; j < sideLength; j++) {
        board[i].push(null);
      }
    }
    return board;
  }

  getBoard(): (Piece | null)[][] {
    return this.board;
  }

  hasPiece(position: Position): boolean {
    return this.board[position.x][position.y] !== null;
  }

  getSquare(position: Position): Piece | null {
    return this.board[position.x][position.y];
  }

  setSquare(position: Position, piece: Piece | null) {
    this.board[position.x][position.y] = piece;
    this.update();
  }

  getPieces(): Piece[] {
    return this.board.flat().filter((value) => value !== null) as Piece[];
  }

  move(piece: Piece, position: Position) {
    const legalMoves = piece.getLegalMoves();
    const move = legalMoves.filter(
      (move) =>
        JSON.stringify(move.getGoalPosition()) == JSON.stringify(position)
    )[0];
    if (move) {
      const oldPos = piece.getPosition();
      piece.move(move);
      this.setSquare(oldPos, null);
      this.setSquare(position, piece);
      if (move instanceof Castle) {
        const rook = move.getRook();
        const oldRookPos = rook.getPosition();
        const rookPosition = move.getRookPosition();
        rook.move(new Move(rookPosition));
        this.setSquare(oldRookPos, null);
        this.setSquare(rookPosition, rook);
      }
      if (move instanceof Capture) {
        const deadPiece = move.getAttackedPiece();
        if (
          JSON.stringify(piece.getPosition()) !==
          JSON.stringify(deadPiece.getPosition())
        ) {
          this.unsubscribe(deadPiece);
          this.setSquare(deadPiece.getPosition(), null);
        }
      }
    } else {
      throw new Error(`Invalid move for ${piece.constructor.name}`);
    }
    this.update();
    this.updatePassablePieces();
  }

  getAttackedSquares(color: string): Dict {
    const positions = this.getPieces()
      .filter((piece) => piece.getColor() !== color)
      .flatMap((piece) => {
        return piece.getAttackSquares();
      });
    const map: Dict = {};
    for (const pos of positions) {
      if (!(JSON.stringify(pos) in map)) {
        map[JSON.stringify(pos)] = true;
      }
    }
    return map;
  }

  subscribe(piece: Piece) {
    this.pieces.push(piece);
  }

  unsubscribe(piece: Piece) {
    this.pieces = this.pieces.filter((p) => p !== piece);
  }

  update() {
    this.pieces.forEach((piece) => {
      piece.updateLegalMoves();
    });
  }

  updatePassablePieces() {
    this.pieces.forEach((piece) => {
      if (piece instanceof Pawn) {
        piece.setPassable(false);
      }
    });
  }
}
