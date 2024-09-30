import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/letters');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo ao Self LIBRAS!</h1>
      <button onClick={startGame} style={styles.button}>
        Começar a aprender
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '6rem',
    marginTop: '-2rem',
  },
  button: {
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MainMenu;
