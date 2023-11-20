import React from "react";
import { Player, handleKeyPress, Character } from "./Player"
import { formatTimer } from "./utils";

const keyDict = {};
const useFrameTime = () => {
  const [frameTime, setFrameTime] = React.useState(performance.now());
  React.useEffect(() => {
    let frameId;
    document.addEventListener('keydown', updateKeyDict);
    document.addEventListener('keyup', updateKeyDict);
    Player.el = document.querySelector("#player");
    const frame = (time) => {
      setFrameTime(time);
      update();
      frameId = requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);
  return frameTime;
};

const update = () => {
  // Determine move distance to account diagonal move: 1/Math.sqrt(2) = ~0.707
  let dist =
    keyDict.KeyW && (keyDict.KeyA || keyDict.KeyD) ||
    keyDict.KeyS && (keyDict.KeyA || keyDict.KeyD) ? 0.707 : 1;

  dist *= Player.speed;

  if (keyDict.KeyA) Player.x -= dist;
  if (keyDict.KeyW) Player.y -= dist;
  if (keyDict.KeyD) Player.x += dist;
  if (keyDict.KeyS) Player.y += dist;

  Player.move();
}

const updateKeyDict = (ev) => {
  const k = ev.code;
  if (/^Key[WASD]/.test(k)) { // If is "KeyW,A,S,D" key
    ev.preventDefault();
    keyDict[k] = ev.type === "keydown"; // set boolean true / false
  }
};

const Timer = () => {
  //Setup Game Loop
  const [startTime, setStartTime] = React.useState(0);
  const [pauseTime, setPauseTime] = React.useState(0);
  const paused = pauseTime !== undefined;
  const frameTime = useFrameTime();
  const displayTime = paused ? pauseTime : frameTime - startTime;
  const pause = () => {
    setPauseTime(displayTime);
  };

  //Manage Player


  const play = () => {
    setStartTime(performance.now() - pauseTime);
    setPauseTime(undefined);
    console.log(Player);
  };
  return (
    <div className="timer">
      <div>{formatTimer(displayTime)}</div>
      <button onClick={paused ? play : pause}>
        {paused ? "Play" : "Pause"}
      </button>
      <div id="player"></div>
    </div>
  );
};

export default function Game() {
  return <Timer />;
}
