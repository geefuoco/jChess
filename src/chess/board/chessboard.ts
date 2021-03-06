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
import { Promotion } from "../moves/promotion";
import { Queen } from "../pieces/queen/queen";
import { Bishop } from "../pieces/bishop/bishop";
import { Rook } from "../pieces/rook/rook";
import { Knight } from "../pieces/knight/knight";
import { King } from "../pieces/king/king";

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

enum Colors {
  "white",
  "black"
}

export type Color = keyof typeof Colors;

type Dict = {
  [key: string]: boolean | undefined;
};

export class ChessBoard {
  board: (Piece | null)[][];
  pieces: Piece[];
  targetKing: King | null;
  enPassent: Pawn | null;
  currentPlayer: Color;
  halfMove: number;
  fullMove: number;
  constructor() {
    this.board = this.createChessBoard(8);
    this.pieces = [];
    this.targetKing = null;
    this.enPassent = null;
    this.currentPlayer = "white";
    this.halfMove = 0;
    this.fullMove = 1;
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
  }

  getPieces(): Piece[] {
    return this.pieces;
  }

  getEnPassent(): Pawn | null {
    return this.enPassent;
  }

  getCurrentPlayer(): Color {
    return this.currentPlayer;
  }

  getHalfMove(): number {
    return this.halfMove;
  }

  getFullMove(): number {
    return this.fullMove;
  }

  move(piece: Piece, position: Position) {
    if (this.isDraw()) {
      console.log("Game ended in a draw");
      return;
    }
    const legalMoves = piece.getLegalMoves();
    const move = legalMoves.filter(
      (move) =>
        JSON.stringify(move.getGoalPosition()) == JSON.stringify(position)
    )[0];
    if (move) {
      if (this.moveEndangersKing(piece, position)) return;
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
          this.setSquare(deadPiece.getPosition(), null);
        }
        this.unsubscribe(deadPiece);
        this.halfMove = 0;
      }
      if (move instanceof Promotion) {
        const deadPiece = move.getAttackedPiece();
        if (deadPiece) {
          this.unsubscribe(deadPiece);
          this.halfMove = 0;
        }
      }
      if (piece instanceof Pawn) {
        this.halfMove = 0;
      }
      this.resetEnPassent();
      if (move.isSpecial()) {
        this.enPassent = piece as Pawn;
      }
    } else {
      throw new Error(`Invalid move for ${piece.constructor.name}`);
    }
    this.update();
    if (this.check()) {
      this.targetKing = this.getKingUnderAttack();
      this.targetKing?.setChecked(true);
      this.targetKing?.updateLegalMoves();
      console.log(`Check on ${this.targetKing?.getColor()} king`);
      if (this.checkmate()) {
        console.log(`Checkmate. ${this.currentPlayer} wins`);
        return;
      }
    } else {
      this.targetKing?.setChecked(false);
      this.targetKing = null;
    }
    this.incrementHalfMove();
    this.incrementFullMove();
    this.swapPlayers();
  }

  subscribe(piece: Piece) {
    this.pieces.push(piece);
  }

  unsubscribe(piece: Piece) {
    this.pieces = this.pieces.filter((p) => p !== piece);
  }

  promote(piece: Piece, newPiece: string) {
    let promotion: Piece;
    switch (newPiece) {
      case "B":
      case "b":
        promotion = new Bishop(this, piece.getColor(), piece.getPosition());
        break;
      case "R":
      case "r":
        promotion = new Rook(this, piece.getColor(), piece.getPosition());
        break;
      case "N":
      case "n":
        promotion = new Knight(this, piece.getColor(), piece.getPosition());
        break;
      default:
        promotion = new Queen(this, piece.getColor(), piece.getPosition());
        break;
    }

    this.setSquare(promotion.getPosition(), promotion);
    this.unsubscribe(piece);
    return promotion;
  }

  check(): boolean {
    return this.isKingUnderAttack("white") || this.isKingUnderAttack("black");
  }

  testCheck(color: Color): boolean {
    return this.pieces.some((p) => {
      if (!(p instanceof King)) {
        const moves = p.generateMoveSet();
        return moves.some((m) => {
          if (m instanceof Capture || m instanceof Promotion) {
            const piece = m.getAttackedPiece();
            if (piece instanceof King && piece.getColor() === color) {
              return true;
            }
          }
        });
      }
    });
  }

  checkmate(): boolean {
    if (this.targetKing) {
      const moves: Move[] = this.getLegalMovesForColor(
        this.targetKing.getColor()
      );
      return this.targetKing.isChecked() && moves.length === 0;
    }
    return false;
  }

  getKingUnderAttack(): King | null {
    if (this.isKingUnderAttack("black")) {
      return this.getKing("black");
    } else if (this.isKingUnderAttack("white")) {
      return this.getKing("white");
    }
    return null;
  }

  moveEndangersKing(piece: Piece, position: Position): boolean {
    let bool = false;

    const oldPos = piece.getPosition();
    const otherPiece = this.getSquare(position);
    if (otherPiece) {
      this.unsubscribe(otherPiece);
    }

    piece.setPosition(position);
    this.setSquare(oldPos, null);
    this.setSquare(position, piece);
    bool = this.testCheck(piece.getColor());
    piece.setPosition(oldPos);
    if (otherPiece) {
      this.setSquare(position, otherPiece);
      this.subscribe(otherPiece);
    } else {
      this.setSquare(position, null);
    }
    this.setSquare(oldPos, piece);
    return bool;
  }

  isKingUnderAttack(color: Color): boolean {
    const attackedSquares = this.getAttackedSquares(color);
    const king = this.getKing(color);
    return JSON.stringify(king?.getPosition()) in attackedSquares;
  }

  getAttackedSquares(color: Color): Dict {
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

  getKing(color: Color): King | null {
    const king = this.pieces.filter(
      (p) => p instanceof King && p.getColor() === color
    )[0];
    return (king as King) || null;
  }

  convertPositionToChessCoordinate(pos: Position): string {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const { x, y } = pos;
    return `${letters[y]}${Math.abs(x - 8)}`;
  }

  convertChessCoordinateToPosition(coord: string): Position | null {
    if (coord === "-") {
      return null;
    }
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const [x, y] = coord.split("");
    return { x: Math.abs(Number(y) - 8), y: letters.findIndex((i) => i == x) };
  }

  gameover(): boolean {
    return this.isDraw() || this.checkmate();
  }

  private isDraw(): boolean {
    return this.fiftyMoveRule() || this.stalemate() || this.unwinablePosition();
  }

  private stalemate(): boolean {
    const legalMoves = this.getLegalMovesForColor(this.currentPlayer);
    return legalMoves.length === 0;
  }

  private unwinablePosition(): boolean {
    const nonKingPieces = this.pieces.filter((p) => !(p instanceof King));
    if (nonKingPieces.length === 0) return true;
    const nonBishopKnightKingPieces = nonKingPieces.filter((p) => {
      return !(p instanceof Knight) && !(p instanceof Bishop);
    });
    if (nonBishopKnightKingPieces.length === 0) {
      const pieceCount = this.pieceCount();
      if (
        (pieceCount["N"] > 0 &&
          (pieceCount["Bls"] > 0 || pieceCount["Bds"] > 0)) ||
        (pieceCount["n"] > 0 &&
          (pieceCount["bls"] > 0 || pieceCount["bds"] > 0))
      ) {
        //Knight and bishop
        return false;
      }
      if (
        (pieceCount["N"] === 0 &&
          pieceCount["Bls"] > 0 &&
          pieceCount["Bds"] > 0) ||
        (pieceCount["n"] === 0 &&
          pieceCount["bls"] > 0 &&
          pieceCount["bds"] > 0)
      ) {
        //Bishop pair
        return false;
      }
      if (pieceCount["N"] > 2 || pieceCount["n"] > 2) {
        //3 knights
        return false;
      }
      return true;
    }
    return false;
  }

  private pieceCount(): { [key: string]: number } {
    const map: { [key: string]: number } = {};
    this.pieces.forEach((p) => {
      let code = p.getPieceCode();
      if (p instanceof Bishop) {
        const x = p.getPosition().x;
        const y = p.getPosition().y;
        const suffix = ((x + y) & 1) === 1 ? "ls" : "ds";
        code += suffix;
      }

      if (!(code in map)) {
        map[code] = 0;
      }
      map[code]++;
    });
    return map;
  }

  private getLegalMovesForColor(color: Color): Move[] {
    const moves: Move[] = [];
    const pieces = this.getPiecesOfColor(color);
    pieces.forEach((p) => {
      const legal = p.getLegalMoves();

      legal.forEach((mo) => {
        if (!this.moveEndangersKing(p, mo.getGoalPosition())) {
          moves.push(mo);
        }
      });
    });
    return moves;
  }

  private getPiecesOfColor(color: Color): Piece[] {
    return this.pieces.filter((p) => p.getColor() === color);
  }

  private incrementHalfMove() {
    this.halfMove += 1;
  }

  private incrementFullMove() {
    this.fullMove += 1;
  }

  private fiftyMoveRule(): boolean {
    return this.halfMove >= 50;
  }

  private swapPlayers() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
  }

  private resetEnPassent() {
    if (this.enPassent) {
      this.enPassent.setPassable(false);
    }
    this.enPassent = null;
  }

  private update() {
    this.pieces.forEach((piece) => {
      piece.updateLegalMoves();
    });
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
}
