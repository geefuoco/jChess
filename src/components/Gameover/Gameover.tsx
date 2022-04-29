import React from "react";
import "./Gameover.css";

const Gameover: React.FC = () => {
  return (
    <div className="gameover">
      <h1>Gameover</h1>
      <button className="play-again" type="button">
        Rematch?
      </button>
    </div>
  );
};

export default Gameover;
