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
      if (response.statusCode) {
        history.push('/');
      } else {
        setTracks(response);
      }
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

  const logout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div id="tracks-container">
      <div className="tracks-header">
        <h1>Your Tracks</h1>
        <div className="button-container">
          <div onClick={toggleCreate} className="white-button button">
            Create Track
          </div>
          <div onClick={logout} className="white-button button">
            Logout
          </div>
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
