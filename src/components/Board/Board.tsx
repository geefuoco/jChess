import React, { useState, useContext, useEffect } from "react";
import "./Board.css";
import Cell from "../Cell/Cell";
import { ChessBoard, pieceMap } from "../../chess/board/chessboard";
import { ChessBoardContext } from "../ChessboardContext";
import { Piece } from "../../chess/pieces/piece";
import PromotionBoard from "../PromotionBoard/PromotionBoard";
import { Fen } from "../../chess/fen/fen";
import FenInput from "../FenInput/FenInput";
import Gameover from "../Gameover/Gameover";

const Board: React.FC = () => {
  const chessBoard = useContext(ChessBoardContext).chessBoard as ChessBoard;
  const [board, setBoard] = useState(chessBoard.getBoard());
  const [promotablePiece, setPromotablePiece] = useState<Piece | null>(null);
  const [fenInput, setFenInput] = useState(false);
  const [isGameover, setIsGameover] = useState(false);

  useEffect(() => {
    setIsGameover(chessBoard.gameover());
  }, [board]);

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
            gameover={isGameover}
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

  const toggleFenInput = () => {
    setFenInput(!fenInput);
  };

  return (
    <>
      {isGameover && <Gameover updateChessBoard={setBoard} />}
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
      <div className="button-group">
        <button
          type="button"
          onClick={() => console.log(Fen.getFenFromBoard(chessBoard))}
        >
          Get Fen
        </button>
        <button type="button" onClick={toggleFenInput}>
          Set Fen
        </button>
      </div>
      {fenInput && <FenInput close={setFenInput} updateBoard={setBoard} />}
    </>
  );
};

export default Board;
