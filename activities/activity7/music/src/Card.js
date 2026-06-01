import React from 'react';

const Card = (props) => {

  const handleButtonClick = (uri) => {
    props.onClick(props.albumId, props.navigator, uri);
  };

  return (
    <div className='card' style={{ width: '18rem' }}>
      <img
        src={props.imgURL}
        className='card-img-top'
        alt={props.albumTitle}
      />
      <div className='card-body'>
        <h5 className='card-title'>{props.albumTitle}</h5>
        <p className='card-text'>{props.albumDescription}</p>
        {/* Show button navigates to the detail view */}
        <button
          className='btn btn-primary me-2'
          onClick={() => handleButtonClick('/show/')}
        >
          {props.buttonText}
        </button>
        {/* Edit button navigates to the edit form */}
        <button
          className='btn btn-secondary'
          onClick={() => handleButtonClick('/edit/')}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
