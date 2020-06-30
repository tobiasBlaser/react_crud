import React, { useState } from 'react';
import { createTrack } from '../../services/tracksService';
import './TrackModal.css';

const TrackModal = ({ toggleModal }) => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [length, setLength] = useState('');

  const saveTrack = async () => {
    const response = await createTrack({ name, artist, length });
    if (response) {
      toggleModal();
    }
  };

  return (
    <div className="create-track-container">
      <label htmlFor="name-input">Name:</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label htmlFor="artist-input">Artist:</label>
      <input
        id="artist-input"
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      ></input>
      <label htmlFor="length-input">Length</label>
      <input
        id="length-input"
        type="number"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      ></input>
      <div className="button-container">
        <div className="secondary-button button" onClick={toggleModal}>
          Cancel
        </div>
        <div className="primary-button button" onClick={saveTrack}>
          Save
        </div>
      </div>
    </div>
  );
};

export default TrackModal;
