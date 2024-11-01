import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

const RecognizeWebSocketAPI = () => {
  const webcamRef = useRef(null);
  const [recognizedSign, setRecognizedSign] = useState(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const { letter } = useParams();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('recognized_sign', (data) => {
      setRecognizedSign(`${data.sign} (Confiabilidade: ${(data.confidence * 100).toFixed(1)}%)`); // Recognized sign + Confidence percentage
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      socketRef.current.emit('video_frame', imageSrc);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendFrame();
    }, 1000 );
    // Sends to the backend a frame every X ms, where X is a value defined according the
    // desired fps: 33.33 ms for 30 fps, 16.67 ms for 60 fps, 1000 ms for 1 fps, etc.
    return () => clearInterval(intervalId);
  }, []);

  const goBack = () => {
    navigate(`/video/${letter}`);
    // window.history.back()
  };

  const goLetters = () => {
    navigate(`/letters`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tente executar o sinal da letra {letter}:</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }} // Ensure front-facing camera is used
        style={styles.webcam}
      />
      <div style={styles.labelRecognizedSign}>
        {recognizedSign ? `Sinal Reconhecido: ${recognizedSign}` : 'Aguardando o Sinal...'}
      </div>
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
    transform: 'scaleX(-1)',  // Flip the video horizontally
  },
  labelRecognizedSign: {
    marginTop: '1rem',
    fontSize: '1.5rem',
    color: 'green',
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

export default RecognizeWebSocketAPI;
