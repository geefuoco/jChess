import React, { Dispatch, SetStateAction, useContext } from "react";
import { ChessBoard } from "../../chess/board/chessboard";
import { Fen } from "../../chess/fen/fen";
import { Piece } from "../../chess/pieces/piece";
import { ChessBoardContext } from "../ChessboardContext";
import "./Gameover.css";

interface Props {
  updateChessBoard: Dispatch<SetStateAction<(Piece | null)[][]>>;
}

const Gameover: React.FC<Props> = ({ updateChessBoard }) => {
  const { chessBoard, setChessBoard } = useContext(ChessBoardContext);
  const newBoard = new ChessBoard();

  const handleClick = () => {
    const fen = Fen.from(Fen.STARTING_BOARD);
    if (fen && chessBoard) {
      Fen.setBoardFromFen(newBoard, fen);
      setChessBoard(newBoard);
      updateChessBoard(newBoard.getBoard());
    }
  };

  return (
    <div className="gameover">
      <h1>Gameover</h1>
      <button className="play-again" type="button" onClick={handleClick}>
        Rematch?
      </button>
    </div>
  );
};

export default Gameover;
