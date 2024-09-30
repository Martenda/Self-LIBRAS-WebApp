import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={styles.container}>
      <h1 style={styles.title}>Escolha uma letra para aprender:</h1>
      <div style={styles.grid}>
        {letters.map((letter) => (
          <div
            key={letter}
            style={{
              ...styles.letterBox,
              ...(disabledLetters.includes(letter) && styles.disabledLetterBox),
            }}
            onClick={() => goToVideoScreen(letter)}
            className={disabledLetters.includes(letter) ? 'disabled' : ''}
          >
            {letter}
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={goBack} style={styles.button}>
          Voltar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f0f8ff',
    padding: '0rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    marginTop: '0rem',  // Adjusted top margin for balance
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '1rem',
    marginBottom: '2rem',
  },
  letterBox: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '2rem',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    width: '3rem',
  },
  disabledLetterBox: {
    backgroundColor: '#6fad70',  // Gray color to indicate it's disabled
    color: '#fff',  // Keep text white
    cursor: 'not-allowed',  // Change the cursor to indicate it's disabled
    opacity: 0.6,  // Reduce opacity to give a disabled effect
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  button: {
    fontSize: '1.2rem',
    padding: '0.7rem 0.9rem',
    backgroundColor: '#4CAF50', //'#e8c400',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 10px',
    height: '3rem',
    width: '7rem',
  },
};

export default LettersMenu;
