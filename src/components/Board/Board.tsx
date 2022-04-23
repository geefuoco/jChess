import React, { useState, useContext } from "react";
import "./Board.css";
import Cell from "../Cell/Cell";
import { pieceMap } from "../../chess/board/chessboard";
import { ChessBoardContext } from "../..";

const Board: React.FC = () => {
  const chessBoard = useContext(ChessBoardContext);
  const [board, setBoard] = useState(chessBoard.getBoard());

  const generateBoard = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    board.forEach((row, rowIdx) => {
      const cellRow: JSX.Element[] = [];
      row.forEach((piece, colIdx) => {
        cellRow.push(
          <Cell
            piece={
              piece
                ? { piece, image: pieceMap[piece.getPieceCode()] as string }
                : undefined
            }
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
