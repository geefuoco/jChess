import { Rook } from "./rook";
import { ChessBoard } from "../../board/chessboard";

describe("Rook", () => {
  let rook: Rook;
  let board: ChessBoard;

  beforeEach(() => {
    board = new ChessBoard();
    rook = new Rook(board, "black", { x: 4, y: 4 });
  });

  it("should show valid moves for a sliding piece", () => {
    const verticalMovePositions = [
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
      { x: 5, y: 4 },
      { x: 6, y: 4 },
      { x: 7, y: 4 }
    ];

    const horizontalMovePositions = [
      { y: 0, x: 4 },
      { y: 1, x: 4 },
      { y: 2, x: 4 },
      { y: 3, x: 4 },
      { y: 5, x: 4 },
      { y: 6, x: 4 },
      { y: 7, x: 4 }
    ];

    const moveSet = rook.generateMoveSet();

    const verticalRookMovePositions = moveSet
      .map((move) => move.getGoalPosition())
      .filter((pos) => pos.x < 4 || pos.x > 4)
      .sort((a, b) => a.x - b.x);

    const horizontalRookMovePositions = moveSet
      .map((move) => move.getGoalPosition())
      .filter((pos) => pos.y < 4 || pos.y > 4)
      .sort((a, b) => a.y - b.y);

    expect(verticalRookMovePositions).toStrictEqual(verticalMovePositions);
    expect(horizontalMovePositions).toStrictEqual(horizontalRookMovePositions);
  });

  it("should create a capture move if an enemy piece is there", () => {
    const pos = { x: 3, y: 4 };
    board.setSquare(pos, new Rook(board, "white", pos));

    const moveSet = rook.generateMoveSet();
    const captureMove = moveSet.filter((move) => {
      const pos = move.getGoalPosition();
      return pos.x === 3 && pos.y === 4;
    })[0];
    expect(captureMove.constructor.name).toBe("Capture");
  });
});
