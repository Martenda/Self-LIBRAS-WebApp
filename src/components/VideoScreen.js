import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/VideoScreen.css';

const VideoScreen = () => {
  const { letter } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const goBack = () => {
    navigate('/letters');
  };

  const goNext = () => {
    navigate(`/recognize-websocket-api/${letter}`);
  };

  const videoPath = `/videos/${letter}_LIBRAS.mp4`;

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = async () => {
      try {
        if (videoElement) {
          await videoElement.play();
        }
      } catch (error) {
        console.error("Error playing video:", error);
      }
    };

    if (videoElement) {
      handlePlay();
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="video-screen-container-videoscreen">
      <h1 className="video-title-videoscreen">Sinal da letra {letter}:</h1>
      <video
        ref={videoRef}
        className="video-player-videoscreen"
        loop
        muted={true}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="button-container-videoscreen">
        <button onClick={goBack} className="nav-button-videoscreen">
          Voltar às letras
        </button>
        <button onClick={goNext} className="nav-button-videoscreen">
          Entendi, quero tentar!
        </button>
      </div>
    </div>
  );
};

export default VideoScreen;
