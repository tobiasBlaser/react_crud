import React from 'react';
import './Track.css';

function Track(track) {
  return (
    <div key={track.id} id="track">
      <div className="track-header">
        <h2>{track.name}</h2>
      </div>
      <div className="track-footer">
        <p>{track.artist}</p>
        <p>{track.length}</p>
      </div>
    </div>
  );
}

export default Track;
