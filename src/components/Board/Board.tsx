import React, { useState, useContext } from "react";
import "./Board.css";
import Cell from "../Cell/Cell";
import { pieceMap } from "../../chess/board/chessboard";
import { ChessBoardContext } from "../..";
import { Piece } from "../../chess/pieces/piece";
import PromotionBoard from "../PromotionBoard/PromotionBoard";
import { Fen } from "../../chess/fen/fen";

const Board: React.FC = () => {
  const chessBoard = useContext(ChessBoardContext);
  const [board, setBoard] = useState(chessBoard.getBoard());
  const [promotablePiece, setPromotablePiece] = useState<Piece | null>(null);

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
            position={{ x: rowIdx, y: colIdx }}
            key={`${rowIdx}-${colIdx}-${
              piece ? piece.getPieceCode() : "empty"
            }`}
            setBoard={setBoard}
            setPromotablePiece={setPromotablePiece}
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
    <>
      <div
        data-testid="board"
        className="board"
        onDrag={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {generateBoard()}
      </div>
      {promotablePiece && (
        <PromotionBoard
          piece={promotablePiece}
          color={promotablePiece.getColor()}
          setPromotablePiece={setPromotablePiece}
        />
      )}
      <button onClick={() => console.log(Fen.getFenFromBoard(chessBoard))}>
        Get Fen
      </button>
    </>
  );
};

export default Board;
