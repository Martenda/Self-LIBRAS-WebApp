import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MainMenu.css';

const MainMenu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/letters');
  };

  return (
    <div className="container-mainmenu">
      <h1 className="title-mainmenu">Bem-vindo ao Self LIBRAS!</h1>
      <button onClick={startGame} className="button-mainmenu">
        Começar a aprender
      </button>
    </div>
  );
};

export default MainMenu;
