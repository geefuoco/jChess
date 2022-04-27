import React, { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import { ChessBoard } from "../../chess/board/chessboard";
import { Fen } from "../../chess/fen/fen";
import { Piece } from "../../chess/pieces/piece";
import "./FenInput.css";

interface Props {
  close: Dispatch<SetStateAction<boolean>>;
  updateBoard: Dispatch<SetStateAction<(Piece | null)[][]>>;
}

const FenInput: React.FC<Props> = ({ close, updateBoard }) => {
  const inref = useRef<HTMLInputElement>(null);
  const chessBoard = new ChessBoard();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { current } = inref;
    if (current) {
      const fen = Fen.from(current.value);
      if (fen) {
        Fen.setBoardFromFen(chessBoard, fen);
        updateBoard([...chessBoard.getBoard()]);
        close(false);
      } else {
        console.error("Could not load FEN string");
      }
    }
  };

  return (
    <form className="fen-input" onSubmit={handleSubmit}>
      <input type="text" placeholder="Insert FEN here" required ref={inref} />
      <button type="submit">Set</button>
    </form>
  );
};

export default FenInput;
