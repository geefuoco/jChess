import { ChessBoard, pieceMap } from "../board/chessboard";
import { FenOptions } from "../interfaces/fenOptions";
import { Position } from "../interfaces/position";
import { Bishop } from "../pieces/bishop/bishop";
import { King } from "../pieces/king/king";
import { Knight } from "../pieces/knight/knight";
import { Pawn } from "../pieces/pawn/pawn";
import { Piece } from "../pieces/piece";
import { Queen } from "../pieces/queen/queen";
import { Rook } from "../pieces/rook/rook";

export class Fen {
  pieces: string;
  activeColor: "w" | "b";
  castling: string;
  enPassent: string;
  halfMove: number;
  fullMove: number;
  board: ChessBoard;
  static STARTING_BOARD =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  constructor({
    pieces,
    activeColor,
    castling,
    enPassent,
    halfMove,
    fullMove,
    board
  }: FenOptions) {
    this.pieces = pieces;
    this.activeColor = activeColor;
    this.castling = castling;
    this.enPassent = enPassent;
    this.halfMove = halfMove;
    this.fullMove = fullMove;
    this.board = board;
  }

  getFen(): string {
    return `${this.pieces} ${this.activeColor} ${this.castling} ${this.enPassent} ${this.halfMove} ${this.fullMove}`;
  }

  setBoardFromFen() {
    if (!this.validFenString(this.getFen())) {
      throw new Error("Invalid FEN String");
    }
    const pieces = this.pieces.split("/");
    for (let i = 0; i < pieces.length; i++) {
      const section = pieces[i];
      for (let j = 0; j < section.length; j++) {
        if (!isNaN(parseInt(section[j]))) break;
        const tile = section[j];
        if (tile in pieceMap) {
          const pos = { x: i, y: j };
          const piece = this.createPiece(tile, pos);
          this.board.setSquare(pos, piece);
        }
      }
    }
  }

  getFenPiecesFromBoard() {
    let pieces = "";

    const board = this.board.getBoard();
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      let count = 0;
      for (let j = 0; j < board.length; j++) {
        const piece = row[j];
        if (piece) {
          pieces += this.getPieceKey(piece);
        } else {
          count++;
        }
      }

      if (count > 0) {
        pieces += count.toString();
      }

      if (i < board.length - 1) {
        pieces += "/";
      }
    }
    return pieces;
  }

  validFenString(fen: string): boolean {
    const fenRegex =
      /\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/;
    const result = fen.match(fenRegex);
    return result && result.length > 0 ? true : false;
  }

  getPieceKey(piece: Piece): string {
    switch (piece.constructor) {
      case King:
        return piece.getColor() == "white" ? "K" : "k";
      case Queen:
        return piece.getColor() == "white" ? "Q" : "q";
      case Bishop:
        return piece.getColor() == "white" ? "B" : "b";
      case Knight:
        return piece.getColor() == "white" ? "N" : "n";
      case Rook:
        return piece.getColor() == "white" ? "R" : "r";
      case Pawn:
        return piece.getColor() == "white" ? "P" : "p";
      default:
        throw new Error("Invalid Piece used for key");
    }
  }

  createPiece(pieceKey: string, position: Position): Piece {
    switch (pieceKey) {
      case "k":
        return new King(this.board, "black", position);
      case "q":
        return new Queen(this.board, "black", position);
      case "r":
        return new Rook(this.board, "black", position);
      case "b":
        return new Bishop(this.board, "black", position);
      case "n":
        return new Knight(this.board, "black", position);
      case "p":
        return new Pawn(this.board, "black", position);
      case "K":
        return new King(this.board, "white", position);
      case "Q":
        return new Queen(this.board, "white", position);
      case "R":
        return new Rook(this.board, "white", position);
      case "B":
        return new Bishop(this.board, "white", position);
      case "N":
        return new Knight(this.board, "white", position);
      case "P":
        return new Pawn(this.board, "white", position);
      default:
        throw new Error("Invalid Key for creating a piece");
    }
  }
}
