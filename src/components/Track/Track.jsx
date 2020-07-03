import { useFormik } from 'formik';
import React, { useState } from 'react';
import { delete_icon, edit_icon } from '../../assets/images/index';
import { deleteTrack, updateTrack } from '../../services/tracksService';
import './Track.css';

const validate = (values) => {
  const errors = {};

  const strings = [values.name, values.artist];
  strings.forEach((element, index) => {
    const prefix = index === 0 ? 'Name' : 'Artist';
    if (!element) {
      errors[prefix.toLowerCase()] = prefix + ' field cannot be empty';
    } else if (element.length > 50) {
      errors[prefix.toLowerCase()] = prefix + ' cannot be more then 50 chars';
    }
  });

  if (!values.trackLength || values.trackLength === 0) {
    errors.trackLength = 'Length field cannot be empty or 0';
  } else if (values.trackLength > 60) {
    errors.trackLength = 'Length cannot be more then 1 hour';
  }

  return errors;
};

const Track = ({ track }) => {
  const [showEdit, setShowEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      artist: '',
      length: '',
    },
    onSubmit: (values) => {
      editTrack(...values);
    },
    validate,
  });

  const toggleShowEdit = () => setShowEdit(!showEdit);

  const editTrack = async (name, artist, length) => {
    const response = await updateTrack(track.id, { name, artist, length });
    if (response.id) {
      toggleShowEdit();
      window.location.reload();
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
      <form id="track" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <p className="error">{formik.errors.name}</p>

        <label htmlFor="artist">Artist:</label>
        <input
          id="artist"
          type="text"
          value={formik.values.artist}
          onChange={formik.handleChange}
        />
        <p className="error">{formik.errors.artist}</p>

        <label htmlFor="trackLength">Length</label>
        <input
          id="trackLength"
          type="number"
          value={formik.values.trackLength}
          onChange={formik.handleChange}
        />
        <p className="error">{formik.errors.trackLength}</p>

        <div className="button-container">
          <button onClick={toggleShowEdit} className="white-button button">
            Cancel
          </button>
          <button type="submit" className="primary-button button">
            Save
          </button>
        </div>
      </form>
    );
  };

  return <div>{showEdit ? renderEdit() : renderTrack()}</div>;
};

export default Track;
