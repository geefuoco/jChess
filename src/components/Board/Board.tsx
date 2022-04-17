import React, { useState } from "react";
import "./Board.css";
import Cell from "../Cell/Cell";
import { ChessBoard, pieceMap } from "../../chess/board/chessboard";
import { Fen } from "../../chess/fen/fen";

const chessBoard = new ChessBoard();
const fen = new Fen({
  pieces: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  activeColor: "w",
  castling: "KQkq",
  enPassent: "-",
  halfMove: 0,
  fullMove: 1,
  board: chessBoard
});
fen.setBoardFromFen();

const Board: React.FC = () => {
  const [board, setBoard] = useState(chessBoard.getBoard());

  const generateBoard = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    board.forEach((row, rowIdx) => {
      const cellRow: JSX.Element[] = [];
      row.forEach((col, colIdx) => {
        const square = chessBoard.getSquare({ x: rowIdx, y: colIdx });
        cellRow.push(
          <Cell
            piece={square ? pieceMap[square.getPieceCode()] : undefined}
            light={((colIdx + rowIdx) & 1) === 1}
            key={`${rowIdx}-${colIdx}`}
          />
        );
      });
      elements.push(
        <div className="board-row" key={rowIdx}>
          {cellRow}
        </div>
      );
    });
    return elements;
  };

  return (
    <div data-testid="board" className="board">
      {generateBoard()}
    </div>
  );
};

export default Board;
