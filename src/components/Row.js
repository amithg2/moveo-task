import { useEffect, useRef, useState } from "react";
import { withStyles } from "@mui/styles";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import styles from "./styles/RowStyles";

function Row(props) {
  const {
    color,
    sound,
    isPlaying,
    isLoop,
    currentTime,
    isMuteAll,
    stopAll,
    changedTime,
    name,
    classes,
  } = props;
  const [isMute, setIsMute] = useState(false);

  const audioPlayer = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isLoop) {
      audioPlayer.current.loop = true;
    } else {
      audioPlayer.current.loop = false;
    }
  }, [isLoop]);

  useEffect(() => {
    audioPlayer.current.currentTime = currentTime;
  }, [changedTime]);

  useEffect(() => {
    if (isMute || isMuteAll) {
      audioPlayer.current.volume = 0;
    } else {
      audioPlayer.current.volume = 1;
    }
  }, [isMute, isMuteAll]);

  useEffect(() => {
    if (stopAll) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
    }
  }, [stopAll]);

  const handleEnded = () => {
    audioPlayer.current.currentTime = 0.1;
  };
  return (
    <div
      style={{ backgroundColor: isMute || isMuteAll ? "lightgrey" : color }}
      className={classes.Row}
    >
      <div className={classes.controller}>
        <Button
          onClick={() => setIsMute(!isMute)}
          className={classes.button}
          disabled={isMuteAll}
        >
          {isMute || isMuteAll ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Button>
        <p className={classes.name}>{name}</p>
      </div>
      <audio
        src={sound}
        preload="auto"
        onEnded={handleEnded}
        ref={audioPlayer}
      ></audio>
    </div>
  );
}

export default withStyles(styles)(Row);
