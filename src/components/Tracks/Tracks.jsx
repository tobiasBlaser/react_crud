import React, { useEffect, useState } from 'react';
import { getTracks } from '../../services/tracksService';
import Track from '../Track/Track';

function Tracks() {
  const [tracks, setTracks] = useState();

  useEffect(() => {
    const getNewTracks = async () => {
      const tr = await getTracks();
      setTracks(tr);
    };
    getNewTracks();
  });

  if (!tracks) return null;
  const renderTracks = () => {
    return tracks.map((track) => {
      return Track(track);
    });
  };

  return (
    <div id="tracks-conatiner">
      <h1>Your Tracks</h1>
      <div id="tracks">{renderTracks()}</div>
    </div>
  );
}

export default Tracks;
