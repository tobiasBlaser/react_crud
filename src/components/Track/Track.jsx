import React, { useState } from 'react';
import { delete_icon, edit_icon } from '../../assets/images/index';
import { deleteTrack, updateTrack } from '../../services/tracksService';
import { validateTrack } from '../../services/validationService';
import './Track.css';

const Track = ({ track }) => {
  const [name, setName] = useState(track.name);
  const [artist, setArtist] = useState(track.artist);
  const [length, setLength] = useState(track.length);
  const [nameError, setNameError] = useState('');
  const [artistError, setArtistError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const toggleShowEdit = () => setShowEdit(!showEdit);

  const validate = () => {
    const validatedTrack = validateTrack(name, artist, length);

    setNameError(validatedTrack.NameError);
    setArtistError(validatedTrack.ArtistError);
    setLengthError(validatedTrack.lengthError);

    return validatedTrack;
  };

  const editTrack = async () => {
    const validatedTrack = validate();
    if (
      !validatedTrack.NameError &&
      !validatedTrack.ArtistError &&
      !validatedTrack.lengthError
    ) {
      const response = await updateTrack(track.id, { name, artist, length });
      if (response.id) {
        toggleShowEdit();
        window.location.reload();
      }
    }
  };

  const removeTrack = async () => {
    await deleteTrack(track.id);
    window.location.reload();
  };

  const renderTrack = () => {
    return (
      <div id="track">
        <div className="track-header">
          <h2>{track.name}</h2>
          <div className="icon-container">
            <img
              onClick={toggleShowEdit}
              className="icon"
              src={edit_icon}
              alt="edit"
            ></img>
            <img
              onClick={removeTrack}
              className="icon"
              src={delete_icon}
              alt="delete"
            ></img>
          </div>
        </div>
        <div className="track-footer">
          <p>{track.artist}</p>
          <p>{track.length}</p>
        </div>
      </div>
    );
  };

  const renderEdit = () => {
    return (
      <div id="track">
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
          <div className="secondary-button button" onClick={toggleShowEdit}>
            Cancel
          </div>
          <div onClick={editTrack} className="primary-button button">
            Save
          </div>
        </div>
      </div>
    );
  };

  return <div>{showEdit ? renderEdit() : renderTrack()}</div>;
};

export default Track;
