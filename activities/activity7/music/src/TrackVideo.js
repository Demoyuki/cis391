import React from 'react';

const TrackVideo = (props) => {
  if (!props.track || !props.track.video) {
    return (
      <div className='card p-3'>
        <p>Select a track to view its video.</p>
      </div>
    );
  }

  // Convert a YouTube watch URL to an embeddable URL
  const embedUrl = props.track.video.replace('watch?v=', 'embed/');

  return (
    <div className='card p-3'>
      <h5>{props.track.title} — Video</h5>
      <iframe
        width='100%'
        height='300'
        src={embedUrl}
        title={props.track.title}
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TrackVideo;
