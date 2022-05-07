import React from "react";
import "./Moves.css";

interface Props {
  list: string[] | null;
}

const Moves: React.FC<Props> = ({ list }) => {
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
