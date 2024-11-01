// import React, { useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';

const RecognizeAI = () => {
  const { letter } = useParams();
  // const webcamRef = useRef(null);
  const navigate = useNavigate();

  // const captureAndSendFrame = useCallback(async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
    
  //   const formData = new FormData();
  //   const blob = await fetch(imageSrc).then(r => r.blob());
  //   formData.append('frame', blob);

  //   const response = await fetch('http://localhost:5000/recognize-ai', {
  //     method: 'POST',
  //     body: formData
  //   });

  //   const result = await response.json();
  //   if (result.success) {
  //     console.log('Recognized sign:', result.recognized_sign);
  //     // Display success message to user
  //   } else {
  //     console.log('Recognition failed:', result.message);
  //   }
  // }, [webcamRef]);

  const goBack = () => {
    navigate(`/video/${letter}`);
  };

  const goLetters = () => {
    navigate(`/letters`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Abra o aplicativo de Reconhecimento e tente executar o sinal</h2>
      {/* <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={styles.webcam}
      /> */}
      <div style={styles.buttonContainer}>
        <button onClick={goLetters} style={styles.button}>Voltar às letras</button>
        <button onClick={goBack} style={styles.button}>Assistir novamente</button>
        {/* <button onClick={captureAndSendFrame} style={styles.button}>Enviar Frame</button> */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '0rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    marginTop: '-1rem',
  },
  webcam: {
    width: 'auto',
    height: '70%',
    borderRadius: '10px',
    // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  // Adding a slight shadow
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
  },
  button: {
    fontSize: '1.2rem',
    padding: '0.7rem 0.9rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 1rem',
    height: '3rem',
    width: '15rem',
  },
};

export default RecognizeAI;
