import React from "react";
import "./Board.css";
import Cell from "../Cell/Cell";

const Board: React.FC = () => {
  const sideLength = 8;

  const createRow = (index: number): JSX.Element => {
    const row: JSX.Element[] = [];
    for (let i = 0; i < sideLength; i++) {
      const move = (index & 1) + i;
      row.push(<Cell light={(move & 1) === 0} key={`${i},${index}`} />);
    }
    return (
      <div key={index} className="board-row">
        {row}
      </div>
    );
  };

  const createStartingBoard = () => {
    const board: JSX.Element[] = [];
    for (let i = 0; i < sideLength; i++) {
      board.push(createRow(i));
    }
    return board;
  };

  return (
    <div data-testid="board" className="board">
      {createStartingBoard()}
    </div>
  );
};

export default Board;
