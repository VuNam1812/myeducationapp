// @flow
import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { LESSION_ACTION } from "../../reducer/reducer";
import userLessionApi from "../../../../../api/userLessionAPI";
import "./style.scss";
export const VideoPlayer = ({ className, video, dispatch }) => {
  const [viewed, setViewed] = useState(
    video.lastSeconds ? video.lastSeconds : 0
  );
  const [videoId, setVideoId] = useState(video.id ? video.id : -1);
  const videoTarget = useRef();
  useEffect(() => {
    setVideoId(video.id);
    if (videoId !== -1 && Math.round(viewed) > 0) {
      userLessionApi.updateInfo({
        id_lecture: videoId,
        lastSeconds: Math.round(viewed),
      });
      updateVideoAndLessions();
    }
    setViewed(0);
  }, [video]);

  const updateVideoAndLessions = () => {
    dispatch({
      type: LESSION_ACTION.UPDATE_SINGLE_LESSIONS,
      payload: {
        id: videoId,
        lastSeconds: Math.round(viewed),
      },
    });
  };

  const handleCompleteLession = (progress) => {
    if (viewed < progress.playedSeconds) {
      setViewed(progress.playedSeconds);
    }
    if (
      video.duration * 0.9 <= progress.playedSeconds &&
      video.isCompleted === 0
    ) {
      dispatch({
        type: LESSION_ACTION.UPDATE_SINGLE_LESSIONS,
        payload: {
          id: videoId,
          lastSeconds: Math.round(viewed),
          isCompleted: 1,
        },
      });
      dispatch({
        type: LESSION_ACTION.UPDATE_VIDEO_COMPLETE,
        payload: 1,
      });
      userLessionApi.updateInfo({
        id_lecture: videoId,
        lastSeconds: Math.round(viewed) + 1,
      });
    }
  };

  return (
    <div className={`video-player ${className}`}>
      {video.src && (
        <ReactPlayer
          ref={videoTarget}
          className="video-player__body"
          url={`${video.src}`}
          controls
          onStart={() => {
            videoTarget.current.seekTo(
              video.lastSeconds ? video.lastSeconds : 0,
              "seconds"
            );
          }}
          onProgress={handleCompleteLession}
        ></ReactPlayer>
      )}
    </div>
  );
};
