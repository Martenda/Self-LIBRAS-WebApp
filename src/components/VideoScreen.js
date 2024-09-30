import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoScreen = () => {
  const { letter } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const goBack = () => {
    navigate('/letters');
  };

  const goNext = () => {
    navigate(`/recognize-ai/${letter}`); // Replace with your next screen route
  };

  // Dynamically construct the video path based on the letter selected
  const videoPath = `/videos/${letter}_LIBRAS.mp4`;

  useEffect(() => {
    // When the component mounts, start the video playback
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
      handlePlay();  // Attempt to play the video when component mounts
    }

    // Cleanup function: stop video when unmounting
    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;  // Reset video to start next time
      }
    };
  }, []);

  return (
    <div style={styles.container} className="video-screen">
      <h1 style={styles.title}>Letra: {letter}</h1>
      <video
        ref={videoRef}
        style={styles.video}  // Use the updated styles for video
        loop
        muted={true} // Plays the video with no sound
        //controls  // Shows video controls like play/pause
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.buttonContainer}>
        <button onClick={goBack} style={styles.button}>
          Voltar às letras
        </button>
        <button onClick={goNext} style={styles.button}>
          Entendi, quero tentar!
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
    marginBottom: '1rem',
    marginTop: '-1rem',  // Added a small margin above the title for balance
  },
  video: {
    // width: '60%',  // Set video width to a percent of the container
    // height: 'auto',  // Auto height to maintain aspect ratio
    width: 'auto',
    height: '70%',
    borderRadius: '10px', // Add a bit of border-radius
    // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  // Add a slight shadow
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

export default VideoScreen;
