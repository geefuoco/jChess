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

  it("should not have moves beyond a piece", () => {
    const pos1 = { x: 3, y: 4 };
    const pos2 = { x: 4, y: 3 };
    const pos3 = { x: 5, y: 4 };
    const pos4 = { x: 4, y: 5 };
    const r1 = new Rook(board, "black", pos1);
    const r2 = new Rook(board, "black", pos2);
    const r3 = new Rook(board, "black", pos3);
    const r4 = new Rook(board, "black", pos4);

    board.setSquare(pos1, r1);
    board.setSquare(pos2, r2);
    board.setSquare(pos3, r3);
    board.setSquare(pos4, r4);

    const moveSet = rook.generateMoveSet();
    expect(moveSet.length).toBe(0);
  });

  it("should not be able to move if a friendly piece is there", () => {
    const spy = jest.spyOn(rook, "updateLegalMoves");
    const r1 = new Rook(board, "black", { x: 4, y: 5 });
    board.setSquare(r1.getPosition(), r1);
    expect(spy).toBeCalled();
    expect(rook.canMove({ x: 4, y: 5 })).toBeFalsy();
  });
});
