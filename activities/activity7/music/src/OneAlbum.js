import React, { useState } from 'react';
import TracksList from './TracksList';
import TrackLyrics from './TrackLyrics';
import TrackVideo from './TrackVideo';

const OneAlbum = (props) => {
  // State to track which track the user has selected
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  if (!props.album || !props.album.title) {
    return <div className='container'><p>Loading album...</p></div>;
  }

  return (
    <div className='container mt-3'>
      <h2>Album Details for {props.album.title}</h2>
      <div className='row'>

        {/* Left column — album card and track list */}
        <div className='col col-sm-3'>
          <div className='card'>
            <img
              src={props.album.image}
              className='card-img-top'
              alt={props.album.title}
            />
            <div className='card-body'>
              <h5 className='card-title'>{props.album.title}</h5>
              <p className='card-text'>{props.album.description}</p>
            </div>
          </div>
          <div className='mt-2'>
            <h6>Tracks</h6>
            <TracksList
              tracks={props.album.tracks || []}
              onSelectTrack={handleSelectTrack}
            />
          </div>
        </div>

        {/* Right column — lyrics and video */}
        <div className='col col-sm-9'>
          <TrackLyrics track={selectedTrack} />
          <div className='mt-3'>
            <TrackVideo track={selectedTrack} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OneAlbum;
