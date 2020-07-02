import { useFormik } from 'formik';
import React from 'react';
import { createTrack } from '../../services/tracksService';
import './TrackModal.css';

const validate = (values) => {
  const errors = {};

  const array = [values.name, values.artist];
  array.forEach((element, index) => {
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

const TrackModal = ({ toggleModal }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      artist: '',
      trackLength: '',
    },
    validate,
    onSubmit: async (values) => {
      await saveTrack(values);
    },
  });

  const saveTrack = async (values) => {
    const response = await createTrack({
      name: values.name,
      artist: values.artist,
      length: values.trackLength,
    });
    if (response.id) {
      toggleModal();
    }
  };

  return (
    <form className="create-track-container" onSubmit={formik.handleSubmit}>
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

      <label htmlFor="trackLength">Track length</label>
      <input
        id="trackLength"
        type="number"
        step="0.01"
        value={formik.values.trackLength}
        onChange={formik.handleChange}
      />
      <p className="error">{formik.errors.trackLength}</p>

      <div className="button-container">
        <div className="secondary-button button" onClick={toggleModal}>
          Cancel
        </div>
        <button type="submit" className="primary-button button">
          Save
        </button>
      </div>
    </form>
  );
};

export default TrackModal;
