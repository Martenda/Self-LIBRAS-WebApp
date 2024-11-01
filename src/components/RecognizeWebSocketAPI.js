import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './styles/RecognizeWebSocketAPI.css';
// import { Hands } from '@mediapipe/hands';
// import { Camera } from '@mediapipe/camera_utils';

const RecognizeWebSocketAPI = () => {
  const webcamRef = useRef(null);
  const [recognizedSign, setRecognizedSign] = useState(null);
  const [matchesSign, setMatchesSign] = useState(false);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const { letter } = useParams();
  // const canvasRef = useRef(null);

  useEffect(() => {
    // // Initialize MediaPipe Hands
    // const hands = new Hands({
    //   locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    // });

    // hands.setOptions({
    //   maxNumHands: 1,
    //   minDetectionConfidence: 0.7,
    //   minTrackingConfidence: 0.7,
    // });

    // hands.onResults(onResults);

    // // Use MediaPipe Camera to stream video from the webcam
    // if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
    //   const camera = new Camera(webcamRef.current.video, {
    //     onFrame: async () => {
    //       await hands.send({ image: webcamRef.current.video });
    //     },
    //     width: 640,
    //     height: 480,
    //   });
    //   camera.start();
    // }

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const hostname = window.location.hostname;
    const port = '5000';
    const path = '/live_camera';
  
    const socketUrl = `${protocol}://${hostname}:${port}${path}`;
  
    socketRef.current = new WebSocket(socketUrl);
    // socketRef.current = new WebSocket('http://192.168.2.126:5000/live_camera');

    socketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
    
    socketRef.current.onmessage = (event) => {
      const messageData = event.data;
setRecognizedSign(messageData);

const modelsData = messageData.split(' - ');

let letterFound = false;

for (const modelData of modelsData) {
  const colonIndex = modelData.indexOf(':');
  const openParenIndex = modelData.indexOf('(');
  const closeParenIndex = modelData.indexOf(')');
  
  if (
    colonIndex !== -1 &&
    openParenIndex !== -1 &&
    closeParenIndex !== -1 &&
    openParenIndex > colonIndex
  ) {
    const predictedLetter = modelData
      .substring(colonIndex + 1, openParenIndex)
      .trim()
      .toUpperCase();

    const confidenceStr = modelData
      .substring(openParenIndex + 1, closeParenIndex)
      .trim();
    const confidenceValue = parseFloat(confidenceStr.replace('%', ''));

    if (
      predictedLetter === letter.toUpperCase() &&
      confidenceValue > 50.0
    ) {
      letterFound = true;
      break; // Exit the loop early since the letter is found
    }
  }
}

setMatchesSign(letterFound);

    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [letter]);

  // const onResults = (results) => {
  //   if (!canvasRef.current || !webcamRef.current) return;

  //   const canvasElement = canvasRef.current;
  //   const canvasCtx = canvasElement.getContext('2d');
    
  //   // Clear previous canvas drawing
  //   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  //   // Draw video on the canvas
  //   canvasCtx.drawImage(webcamRef.current.video, 0, 0, canvasElement.width, canvasElement.height);

  //   // Draw hand landmarks
  //   if (results.multiHandLandmarks) {
  //     for (const landmarks of results.multiHandLandmarks) {
  //       for (let i = 0; i < landmarks.length; i++) {
  //         const landmark = landmarks[i];
  //         canvasCtx.beginPath();
  //         canvasCtx.arc(landmark.x * canvasElement.width, landmark.y * canvasElement.height, 5, 0, 2 * Math.PI);
  //         canvasCtx.fillStyle = 'red';
  //         canvasCtx.fill();
  //       }
  //     }
  //   }
  // };

  const sendFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc && socketRef.current.readyState === WebSocket.OPEN) {
      // Send frame data to the backend
      socketRef.current.send(imageSrc);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendFrame();
    }, 333);
    // Sends to the backend a frame every X ms (X = 33.33 ms -> 30 fps; X = 16.67 ms -> 60 fps; X = 1000 ms -> 1 fps; etc).
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
    <div className="container-recognizewebsocketapi">
      <h2 className="title-recognizewebsocketapi">Tente executar o sinal da letra {letter}:</h2>
      {/* <div className="webcam-container"> */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="webcam-recognizewebsocketapi"
        />
        {recognizedSign && matchesSign && (
          <div className="congrats-message-recognizewebsocketapi">
            <h2 className="congrats-text-recognizewebsocketapi">🎉 Parabéns! Você aprendeu um novo sinal! 🎉</h2>
          </div>
        )}
      {/* </div> */}
      <div className="label-recognized-sign-recognizewebsocketapi">
        {recognizedSign ? `${recognizedSign}` : 'Aguardando conexão com o servidor do projeto...'}
      </div>
      <div className="button-container-recognizewebsocketapi">
        <button onClick={goLetters} className="nav-button-recognizewebsocketapi">Voltar às letras</button>
        <button onClick={goBack} className="nav-button-recognizewebsocketapi">Assistir novamente</button>
      </div>
    </div>
  );
};

export default RecognizeWebSocketAPI;
