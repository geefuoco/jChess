import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  useDrag,
  useDrop,
  DragPreviewImage,
  DropTargetMonitor
} from "react-dnd";
import { ChessBoardContext } from "../..";
import { Position } from "../../chess/interfaces/position";
import { Piece } from "../../chess/pieces/piece";
import "./Cell.css";

interface PieceObject {
  piece: Piece;
  image: string;
}

interface Props {
  piece?: PieceObject;
  light: boolean;
  position: Position;
  setBoard: Dispatch<SetStateAction<(Piece | null)[][]>>;
}

const Cell: React.FC<Props> = ({ piece, light, position, setBoard }) => {
  const chessBoard = useContext(ChessBoardContext);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "piece",
    item: piece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "piece",
      drop: (item: PieceObject) => {
        const { piece } = item;
        try {
          chessBoard.move(piece, position);
          setBoard([...chessBoard.getBoard()]);
        } catch (error) {
          console.error(error);
        }
      },
      canDrop: (item: PieceObject) => {
        const piece = item.piece;
        if (piece.canMove(position)) {
          return true;
        }
        return false;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }),
    [position]
  );

  const dropStyles =
    !isOver && canDrop
      ? {
          backgroundColor: "lightgreen",
          border: "solid 3px yellow"
        }
      : undefined;

  return (
    <>
      <DragPreviewImage src={piece?.image || ""} connect={dragPreview} />
      <div
        className={`cell ${light ? "light" : "dark"}`}
        data-testid="cell"
        ref={drop}
        onDrag={(e) => e.preventDefault()}
        style={dropStyles}
      >
        {piece && (
          <img
            ref={drag}
            src={piece.image}
            alt={piece.piece.getPieceCode()}
            className="piece"
            style={{
              opacity: isDragging ? 0 : 1
            }}
          />
        )}
      </div>
    </>
  );
};

export default Cell;
