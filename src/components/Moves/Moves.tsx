import React from "react";
import { useMoves } from "../MoveContext";
import "./Moves.css";

const Moves: React.FC = () => {
  const list = useMoves().moves;

  return (
    <div className="moves-container">
      <h2 className="moves-title">Moves</h2>
      <div className="move-list-container">
        {list &&
          list.map((value) => {
            return (
              <div className="move-text" key={value}>
                {value}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Moves;
