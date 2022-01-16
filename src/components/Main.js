import { useEffect, useRef, useState } from "react";
import { withStyles } from "@mui/styles";
import Audio1 from "../Loop files/ALL TRACK.mp3";
import audioData from "../audioData";
import Controllers from "./Controllers";
import Header from "./Header";
import Row from "./Row";
import styles from "./styles/MainStyles";

const Main = ({ classes }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [changedTime, setChangedTime] = useState(null);
  const [isLoop, setIsLoop] = useState(false);
  const [isMuteAll, setIsMuteAll] = useState(false);
  const [stopAll, setStopAll] = useState(false);

  const MainAudioPlayer = useRef(); //there is one main audio player that controll all the real players
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => { // this function is creating the input bar based on the duration of the Main Audio player
    const seconds = Math.floor(MainAudioPlayer.current.duration);
    progressBar.current.max = seconds;
  }, [
    MainAudioPlayer?.current?.loadedmetadata,
    MainAudioPlayer?.current?.readyState,
  ]);

  const togglePlayPause = () => { //handle the play and pause
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      MainAudioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying); 
    } else {
      MainAudioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => { //updating the current time while audio is playing
    progressBar.current.value = MainAudioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {  //updating the current time when when the slider is changing
    MainAudioPlayer.current.currentTime = progressBar.current.value;
    setChangedTime(progressBar.current.value);
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => { 
    setCurrentTime(progressBar.current.value);
  };
  const handleStopAll = () => {
    setStopAll(true);
    MainAudioPlayer.current.pause();
    MainAudioPlayer.current.currentTime = 0;
    setIsPlaying(false);

    setTimeout(() => { 
      setStopAll(false);
    }, 500);
  };

  const handleEnding = () => {
    setIsPlaying(false);
  };

  const makeLine = (line) => { //meking the line 
    let linePos = (line / 17) * 100;
    if (linePos > 98) linePos = 98;
    return `${linePos - 0.5}%`;
  };

  const makeRows = () => {
    const newArr = audioData.map((e, i) => {
      return (
        <Row
          color={e.color}
          name={e.name}
          key={i}
          sound={e.sound}
          isPlaying={isPlaying}
          isLoop={isLoop}
          currentTime={currentTime}
          isMuteAll={isMuteAll}
          stopAll={stopAll}
          changedTime={changedTime}
        />
      );
    });
    return newArr;
  };

  return (
    <>
      <Header />
      <div className={classes.Main}>
        <div className={classes.lineContainer}>
          <div className={classes.line} style={{ left: makeLine(currentTime) }}>
            <div
              className={classes.circle}
              style={{ left: makeLine(currentTime) }}
            ></div>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.blockTitle}></div>
          <input
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        <div className={classes.allRows}>
          <audio
            ref={MainAudioPlayer}
            src={Audio1}
            muted={true}
            loop={isLoop}
            preload="auto"
            onEnded={handleEnding}
          ></audio>
          {makeRows()}
        </div>
      </div>
      <Controllers
        setIsMuteAll={setIsMuteAll}
        isMuteAll={isMuteAll}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        handleStopAll={handleStopAll}
        setIsLoop={setIsLoop}
        isLoop={isLoop}
      />
    </>
  );
};

export default withStyles(styles)(Main);
