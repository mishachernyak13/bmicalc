import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop, faStepBackward, faStepForward, faVolumeUp, faVolumeDown, faVolumeMute } from "@fortawesome/free-solid-svg-icons";



const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.15);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Зберігаємо індекс поточної пісні
  const [progress, setProgress] = useState(0); // Новий стан для повзунка прогреса
  const audioRef = useRef(null);
  const songs = [
    {
      title: "VOLODYMYR DANTES — ЧУЄШ",
      src: "/songs/dnts_chuesh.mp3",
    },
    {
      title: "хейтспіч - пісня для радіо",
      src: "/songs/hatespeech-radio.mp3",
    },
    {
      title: "Скрябін - Місця Щасливих Людей",
      src: "/songs/skryabin-happy_places.mp3",
    },
    {
      title: "хейтспіч - Добровольці",
      src: "/songs/hatespeech-dobrovoltsi.mp3",
    }
  ];

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    setCurrentTime(currentTime);
    setProgress(currentTime); // Оновлення повзунка прогреса під час програвання
  };

  const handleLoadedData = (e) => {
    const duration = e.target.duration;
    setDuration(duration);
  };

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    audioRef.current.volume = volume;
    setVolume(volume);
  };

  const handleProgressChange = (e) => {
    const progress = parseFloat(e.target.value);
    setProgress(progress);
    audioRef.current.currentTime = progress; // Встановлення нового часу програвання під час переміщення повзунка прогреса
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        volume={volume}
      />
      <h2 className="song-title">{currentSong.title}</h2>
      <div className="progress-slider-container">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
          className="progress-slider"
        />
        <span className="time">{formatTime(currentTime)}/</span>  <span className="time-full">{formatTime(duration)}</span>
      </div>
      <div className="controls">
        <button className="control-button" onClick={handlePreviousSong}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button className="control-button" onClick={handlePlayPause}>
          {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        <button className="control-button" onClick={handleStop}>
          <FontAwesomeIcon icon={faStop} />
        </button>
        <button className="control-button" onClick={handleNextSong}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
      <div className="volume-slider-container">
        <label className="slider-label">
          {volume > 0.5 ? <FontAwesomeIcon icon={faVolumeUp} /> : volume > 0 ? <FontAwesomeIcon icon={faVolumeDown} /> : <FontAwesomeIcon icon={faVolumeMute} />}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};
export default MusicPlayer;
