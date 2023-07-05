import React from 'react'
import { PlayerState, useYoutube } from "react-youtube-music-player";
import  { useEffect, useRef } from 'react';

import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoStop,
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute
} from "react-icons/io5";

const Front = () => {

  const { playerDetails, actions } = useYoutube({
    id: "RDLbqzhXWl33U",
    type: "playlist"
  });

  const renderVolumeIcon = () => {
    if (playerDetails.volume === 0) {
      return <IoVolumeMute />;
    }
    if (playerDetails.volume <= 30) {
      return <IoVolumeLow />;
    }
    if (playerDetails.volume <= 60) {
      return <IoVolumeMedium />;
    }
    return <IoVolumeHigh />;
  };



  const containerRef = useRef(null);
const boxRef = useRef(null);

const isClicked = useRef(false);

const coords = useRef({
  startX: 1000,
  startY: 420,
  lastX: 1000,
  lastY: 420
});

useEffect(() => {
  if (!boxRef.current || !containerRef.current) return;

  const box = boxRef.current;
  const container = containerRef.current;

  const onMouseDown = (e) => {
    isClicked.current = true;
    coords.current.startX = e.clientX;
    coords.current.startY = e.clientY;
  };

  const onMouseUp = (e) => {
    isClicked.current = false;
    coords.current.lastX = box.offsetLeft;
    coords.current.lastY = box.offsetTop;
  };

  const onMouseMove = (e) => {
    if (!isClicked.current) return;

    const nextX = e.clientX - coords.current.startX + coords.current.lastX;
    const nextY = e.clientY - coords.current.startY + coords.current.lastY;

    box.style.top = `${nextY}px`;
    box.style.left = `${nextX}px`;
  };

  box.addEventListener('mousedown', onMouseDown);
  box.addEventListener('mouseup', onMouseUp);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseUp);

  const cleanup = () => {
    box.removeEventListener('mousedown', onMouseDown);
    box.removeEventListener('mouseup', onMouseUp);
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('mouseleave', onMouseUp);
  };

  return cleanup;
}, []);
  
  return (
    <>

       <div >
        <div  ref={containerRef}className=' bg-black rounded-xl cursor-grab'>
          <div  ref={boxRef}  className="App absolute top-[75%] left-[74%] w-[300px] h-[120px] drop-shadow-xl   dark:drop-shadow-2xl   dark:bg-slate-700 bg-white rounded-xl">
            <div className="video-title select-none dark:text-white  mt-2 ">{playerDetails.title}</div>
            <div className="player-controls">
              <button onClick={actions.previousVideo}>
                <IoPlaySkipBack />
              </button>
              {playerDetails.state === PlayerState.PLAYING ? (
                <button className="emphasised" onClick={actions.pauseVideo}>
                  <IoPause/>
                </button>
              ) : (
                <button className="emphasised" onClick={actions.playVideo}>
                  <IoPlay />
                </button>
              )}
              <button onClick={actions.stopVideo}>
                <IoStop />
              </button>
              <button onClick={actions.nextVideo}>
                <IoPlaySkipForward />
              </button>
              <div className="volume-control">
                {renderVolumeIcon()}
                <input
                  type="range"
                  value={playerDetails.volume ?? 0}
                  min={0}
                  max={100}
                  onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Front