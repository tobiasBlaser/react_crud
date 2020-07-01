import React, { useState } from 'react';
import { createTrack } from '../../services/tracksService';
import { validateTrack } from '../../services/validationService';
import './TrackModal.css';

const TrackModal = ({ toggleModal }) => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [length, setLength] = useState('');
  const [nameError, setNameError] = useState('');
  const [artistError, setArtistError] = useState('');
  const [lengthError, setLengthError] = useState('');

  const saveTrack = async () => {
    const validatedTrack = validate();
    if (
      !validatedTrack.NameError &&
      !validatedTrack.ArtistError &&
      !validatedTrack.lengthError
    ) {
      const response = await createTrack({ name, artist, length });
      if (response.id) {
        toggleModal();
      }
    }
  };

  const validate = () => {
    const validatedTrack = validateTrack(name, artist, length);

    setNameError(validatedTrack.NameError);
    setArtistError(validatedTrack.ArtistError);
    setLengthError(validatedTrack.lengthError);

    return validatedTrack;
  };

  return (
    <div className="create-track-container">
      <label htmlFor="name-input">Name:</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="error">{nameError}</p>

      <label htmlFor="artist-input">Artist:</label>
      <input
        id="artist-input"
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <p className="error">{artistError}</p>

      <label htmlFor="length-input">Length</label>
      <input
        id="length-input"
        type="number"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <p className="error">{lengthError}</p>

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
