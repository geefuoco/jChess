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
      fullMove: 1
    });
  });

  it("should be a valid fen string", () => {
    const fen = f.getFen();
    expect(Fen.validFenString(fen)).toBeTruthy();
    expect(Fen.validFenString("hello")).toBeFalsy();
  });

  it("should set the board to the starting board", () => {
    Fen.setBoardFromFen(board, f);
    expect(f.pieces).toEqual(Fen.getFenPiecesFromBoard(board));
  });

  it("should work with any valid fen", () => {
    const fe = Fen.from(
      "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4"
    );
    if (fe) {
      Fen.setBoardFromFen(board, fe);
      expect(Fen.getFenPiecesFromBoard(board)).toEqual(fe.pieces);
    }
  });

  it("should get the proper fen string from the board", () => {
    const fen = Fen.getFenFromBoard(board);
    expect(Fen.validFenString(fen)).toBeTruthy();
  });
});
