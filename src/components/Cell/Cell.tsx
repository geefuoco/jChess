import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { Piece } from "../../chess/pieces/piece";
import "./Cell.css";

interface Props {
  piece?: { piece: Piece; image: string };
  light: boolean;
}

const Cell: React.FC<Props> = ({ piece, light }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "piece",
    item: piece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <>
      <DragPreviewImage src={piece?.image || ""} connect={dragPreview} />
      <div className={`cell ${light ? "light" : "dark"}`} data-testid="cell">
        {piece && (
          <img
            ref={drag}
            src={piece.image}
            alt={piece.piece.getPieceCode()}
            className="piece"
            style={{ opacity: isDragging ? 0 : 1 }}
          />
        )}
      </div>
    </>
  );
};

export default Cell;
