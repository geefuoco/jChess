import React from "react";
import "./Cell.css";

interface Props {
  piece?: string;
  light: boolean;
}

const Cell: React.FC<Props> = ({ piece, light }) => {
  return (
    <div className={`cell ${light ? "light" : "dark"}`} data-testid="cell">
      {piece && <img src={piece} alt={piece} className="piece" />}
    </div>
  );
};

export default Cell;
