import React from 'react';

// TrackTitle displays a single track and calls onSelect when clicked
const TrackTitle = (props) => {
  return (
    <li
      className='list-group-item list-group-item-action'
      style={{ cursor: 'pointer' }}
      onClick={() => props.onSelect(props.track)}
    >
      {props.track.number}. {props.track.title}
    </li>
  );
};

export default TrackTitle;
