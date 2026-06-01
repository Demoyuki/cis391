import React from 'react';
import TrackTitle from './TrackTitle';

// TracksList maps each track in the album to a TrackTitle component
const TracksList = (props) => {
  const tracks = props.tracks.map((track) => {
    return (
      <TrackTitle
        key={track.trackId}
        track={track}
        onSelect={props.onSelectTrack}
      />
    );
  });

  return (
    <ul className='list-group'>
      {tracks}
    </ul>
  );
};

export default TracksList;
