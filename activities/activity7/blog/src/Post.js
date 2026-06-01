import React from 'react';
import './Post.css';

const Post = (props) => {
  return (
    <div className='post'>
      <h3>{props.title}</h3>
      <p>{props.body}</p>
      {/* Arrow function syntax allows passing the postNumber parameter to the handler */}
      <button onClick={() => props.onDelete(props.postNumber)}>
        Delete
      </button>
    </div>
  );
};

export default Post;
