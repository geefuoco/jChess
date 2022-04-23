import React, { useState, useContext } from "react";
import "./Board.css";
import Cell from "../Cell/Cell";
import { pieceMap } from "../../chess/board/chessboard";
import { ChessBoardContext } from "../..";
import { Piece } from "../../chess/pieces/piece";

type virtualBoard = (Piece | null)[][];

const Board: React.FC = () => {
  const chessBoard = useContext(ChessBoardContext);
  const immutableBoard = chessBoard.getBoard();
  const [board, setBoard] = useState(immutableBoard);

  const generateBoard = (board: virtualBoard): JSX.Element[] => {
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
            position={{ x: rowIdx, y: colIdx }}
            key={`${rowIdx}-${colIdx}-${
              piece ? piece.getPieceCode() : "empty"
            }`}
            setBoard={setBoard}
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
    <div
      data-testid="board"
      className="board"
      onDrag={(e) => e.preventDefault()}
    >
      {generateBoard(board)}
    </div>
  );
};

export default Board;
