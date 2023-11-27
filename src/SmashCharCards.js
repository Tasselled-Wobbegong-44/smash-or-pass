import React, { useState, useEffect } from "react";
import "./App.css";

const CharCard = ({ characters, onCharacterClick }) => {

  return (
    <div class="charCard">
      {characters.map((character) => (
        <button key={character.id} onClick={() => onCharacterClick(character)}>
          <img
            class="CharacterImage"
            src={character.imageUrl}
            alt={character.name}
          />
        </button>
      ))}
    </div>
  );
};

export default CharCard;
