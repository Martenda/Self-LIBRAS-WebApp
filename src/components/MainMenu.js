import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MainMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const MainMenu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/letters');
  };

  const openSurvey = () => {
    window.open('https://google.com', '_blank');
  };

  return (
    <div className="container-mainmenu">
      <h1 className="title-mainmenu">Bem-vindo ao Self LIBRAS!</h1>
      <button onClick={startGame} className="button-mainmenu">
        Começar a aprender
      </button>
      <button onClick={openSurvey} className="button-mainmenu survey-button">
        Participar da pesquisa
      </button>
      <div className="footer-mainmenu">
        <p>Desenvolvido por Lucas Martendal.</p>
        <p>Orientado por Dr. Pablo Schoeffel.</p>
        <p>
          Contato:{' '}
          <a href="mailto:lucasmartendal777@gmail.com">lucasmartendal777@gmail.com</a>
        </p>
        <div className="social-links">
          <a
            href="https://github.com/Martenda"//https://github.com/MartendaBMsoft
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-martendal/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
