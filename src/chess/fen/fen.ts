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
  static STARTING_BOARD =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  constructor({
    pieces,
    activeColor,
    castling,
    enPassent,
    halfMove,
    fullMove
  }: FenOptions) {
    this.pieces = pieces;
    this.activeColor = activeColor;
    this.castling = castling;
    this.enPassent = enPassent;
    this.halfMove = halfMove;
    this.fullMove = fullMove;
  }

  getFen(): string {
    return `${this.pieces} ${this.activeColor} ${this.castling} ${this.enPassent} ${this.halfMove} ${this.fullMove}`;
  }

  static setBoardFromFen(board: ChessBoard, fen: Fen) {
    if (!this.validFenString(fen.getFen())) {
      throw new Error("Invalid FEN String");
    }
    const pieces = fen.pieces.split("/");
    for (let i = 0; i < pieces.length; i++) {
      const section = pieces[i];
      for (let j = 0; j < section.length; j++) {
        if (!isNaN(parseInt(section[j]))) break;
        const tile = section[j];
        if (tile in pieceMap) {
          const pos = { x: i, y: j };
          const piece = this.createPiece(board, tile, pos);
          board.setSquare(pos, piece);
        }
      }
    }
  }

  static getFenPiecesFromBoard(chessBoard: ChessBoard) {
    let pieces = "";

    const board = chessBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      let count = 0;
      for (let j = 0; j < board.length; j++) {
        const piece = row[j];
        if (piece) {
          pieces += Fen.getPieceKey(piece);
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

  static getFenFromBoard(board: ChessBoard): string {
    const pieces = this.getFenPiecesFromBoard(board);
    const activeColor = board.getCurrentPlayer()[0] as "w" | "b";
    const castling = this.getCastlingRights(board);
    const enPassentPos = board.getEnPassent()?.getPosition();
    let enPassent: string;
    if (enPassentPos) {
      enPassent = board.convertPositionToChessCoordinate(enPassentPos);
    } else {
      enPassent = "-";
    }
    const halfMove = board.getHalfMove();
    const fullMove = board.getFullMove();

    return `${pieces} ${activeColor} ${castling} ${enPassent} ${halfMove} ${fullMove}`;
  }

  static getCastlingRights(board: ChessBoard): string {
    const whiteKing = board.getKing("white");
    const blackKing = board.getKing("black");
    const whiteQRook = board.getBoard()[7][0];
    const whiteKRook = board.getBoard()[7][7];
    const blackQRook = board.getBoard()[0][0];
    const blackKRook = board.getBoard()[0][7];

    let str = "";
    if (whiteKing && !whiteKing.getHasMoved()) {
      if (whiteKRook && !whiteKRook.getHasMoved()) {
        str += "K";
      }
      if (whiteQRook && !whiteQRook.getHasMoved()) {
        str += "Q";
      }
    }
    if (blackKing && !blackKing.getHasMoved()) {
      if (blackKRook && !blackKRook.getHasMoved()) {
        str += "k";
      }
      if (blackQRook && !blackQRook.getHasMoved()) {
        str += "q";
      }
    }

    return str.length > 0 ? str : "-";
  }

  static validFenString(fen: string): boolean {
    const fenRegex =
      /\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/;
    const result = fen.match(fenRegex);
    return result && result.length > 0 ? true : false;
  }

  static getPieceKey(piece: Piece): string {
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

  static createPiece(
    board: ChessBoard,
    pieceKey: string,
    position: Position
  ): Piece {
    switch (pieceKey) {
      case "k":
        return new King(board, "black", position);
      case "q":
        return new Queen(board, "black", position);
      case "r":
        return new Rook(board, "black", position);
      case "b":
        return new Bishop(board, "black", position);
      case "n":
        return new Knight(board, "black", position);
      case "p":
        return new Pawn(board, "black", position);
      case "K":
        return new King(board, "white", position);
      case "Q":
        return new Queen(board, "white", position);
      case "R":
        return new Rook(board, "white", position);
      case "B":
        return new Bishop(board, "white", position);
      case "N":
        return new Knight(board, "white", position);
      case "P":
        return new Pawn(board, "white", position);
      default:
        throw new Error("Invalid Key for creating a piece");
    }
  }
}
