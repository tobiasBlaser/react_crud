import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTracks } from '../../services/tracksService';
import Track from '../Track/Track';
import TrackModal from '../TrackModal/TrackModal';
import './Tracks.css';

const Tracks = () => {
  const [tracks, setTracks] = useState();
  const [showModal, setshowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getNewTracks = async () => {
      let response = await getTracks();
      if (response) {
        setTracks(response);
      } else {
        history.push('/');
      }
      setTracks(response);
    };
    getNewTracks();
  }, [history, showModal]);
  if (!tracks) return null;

  const renderTracks = () => {
    if (tracks.length > 0) {
      return tracks.map((track) => {
        return <Track key={track.id} track={track} />;
      });
    }
    return <h2>There are no tracks saved</h2>;
  };

  const toggleCreate = () => setshowModal(!showModal);

  return (
    <div id="tracks-container">
      <div className="tracks-header">
        <h1>Your Tracks</h1>
        <div onClick={toggleCreate} className="white-button button">
          Create Track
        </div>
      </div>
      <div className="tracks-content">
        {showModal ? <TrackModal toggleModal={toggleCreate} /> : null}
        <div id="tracks">{renderTracks()}</div>
      </div>
    </div>
  );
};

export default Tracks;
