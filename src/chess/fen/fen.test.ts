import { ChessBoard } from "../board/chessboard";
import { Fen } from "./fen";

describe("Fen", () => {
  let f: Fen;
  let board: ChessBoard;
  beforeEach(() => {
    board = new ChessBoard();
    f = new Fen({
      pieces: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
      activeColor: "w",
      castling: "KQkq",
      enPassent: "-",
      halfMove: 0,
      fullMove: 1,
      board: board
    });
  });

  it("should be a valid fen string", () => {
    const fen = f.getFen();
    expect(f.validFenString(fen)).toBeTruthy();
    expect(f.validFenString("hello")).toBeFalsy();
  });

  it("should set the board to the starting board", () => {
    f.setBoardFromFen();
    expect(f.pieces).toEqual(f.getFenPiecesFromBoard());
  });
});
