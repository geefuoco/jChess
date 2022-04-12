import { ChessBoard } from "./chessboard";

describe("ChessBoard", () => {
  let board: ChessBoard;
  beforeEach(() => (board = new ChessBoard()));

  it("should generate a starting board", () => {
    const startingBoardPositions = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 8; j++) {
        startingBoardPositions.push({ x: i, y: j });
      }
    }

    for (let i = 6; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        startingBoardPositions.push({ x: i, y: j });
      }
    }

    board.generateStartingBoard();
    expect(board.getPieces().map((piece) => piece.getPosition())).toEqual(
      expect.arrayContaining(startingBoardPositions)
    );
  });
});
