import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import LettersMenu from './components/LettersMenu';
import VideoScreen from './components/VideoScreen';
import RecognizeAI from './components/RecognizeAI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/letters" element={<LettersMenu />} />
        <Route path="/video/:letter" element={<VideoScreen />} />
        <Route path="/recognize-ai/:letter" element={<RecognizeAI />} />
      </Routes>
    </Router>
  );
}

export default App;
