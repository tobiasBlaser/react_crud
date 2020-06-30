import React, { useState } from 'react';
import { delete_icon, edit_icon } from '../../assets/images/index';
import { deleteTrack, updateTrack } from '../../services/tracksService';
import './Track.css';

const Track = ({ track }) => {
  const [name, setName] = useState(track.name);
  const [artist, setArtist] = useState(track.artist);
  const [length, setLength] = useState(track.length);
  const [showEdit, setShowEdit] = useState(false);

  const editTrack = async () => {
    const response = await updateTrack(track.id, { name, artist, length });
    console.log(response);
    toggleShowEdit();
    window.location.reload();
  };

  const removeTrack = async () => {
    await deleteTrack(track.id);
    window.location.reload();
  };

  const toggleShowEdit = () => setShowEdit(!showEdit);

  const renderTrack = () => {
    return (
      <div>
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
      <div>
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

  return <div id="track">{showEdit ? renderEdit() : renderTrack()}</div>;
};

export default Track;
