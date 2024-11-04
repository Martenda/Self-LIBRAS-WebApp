import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LettersMenu.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Disabled letters (H, J, K, X, Z)
const disabledLetters = ['H', 'J', 'K', 'X', 'Z'];

const LettersMenu = () => {
  const navigate = useNavigate();

  const goToVideoScreen = (letter) => {
    if (!disabledLetters.includes(letter)) {
      navigate(`/video/${letter}`);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="container-lettersmenu">
      <h1 className="title-lettersmenu">Escolha uma letra para aprender:</h1>
      <div className="grid-lettersmenu">
        {letters.map((letter) => (
          <div
            key={letter}
            className={`letter-box-lettersmenu ${disabledLetters.includes(letter) ? 'disabled-lettersmenu' : ''}`}
            onClick={() => goToVideoScreen(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="button-container-lettersmenu">
        <button onClick={goBack} className="nav-button-lettersmenu">
          Menu inicial
        </button>
      </div>
    </div>
  );
};

export default LettersMenu;
