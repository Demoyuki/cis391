import React from 'react';

const TrackLyrics = (props) => {
  if (!props.track) {
    return <div className='card p-3'><p>Select a track to view lyrics.</p></div>;
  }

  return (
    <div className='card p-3'>
      <h5>{props.track.title} — Lyrics</h5>
      <p>{props.track.lyrics || 'No lyrics available for this track.'}</p>
    </div>
  );
};

export default TrackLyrics;
