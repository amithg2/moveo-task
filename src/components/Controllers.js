import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { Paper } from "@mui/material";

function Controllers(props) {
  const {
    setIsMuteAll,
    isMuteAll,
    togglePlayPause,
    isPlaying,
    handleStopAll,
    setIsLoop,
    isLoop,
  } = props;
  return (
    <Paper sx={{ mt: "2em" }}>
      <Button onClick={() => setIsMuteAll(!isMuteAll)}>
        {isMuteAll ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </Button>
      <Button onClick={togglePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <Button onClick={handleStopAll}>
        <StopIcon />
      </Button>
      <Button
        onClick={() => setIsLoop(!isLoop)}
        color={isLoop ? "primary" : "inherit"}
      >
        <AllInclusiveIcon />
      </Button>
    </Paper>
  );
}

export default Controllers;
