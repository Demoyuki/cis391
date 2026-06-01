import React, { useState } from 'react';

// AddPost is a controlled component — form values are tracked in state
// on every keystroke so the current value can be sent to the parent on submit
const AddPost = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleClick = () => {
    if (title.trim() === '' || body.trim() === '') return;
    props.onAdd(title, body);
    // Reset the form after adding
    setTitle('');
    setBody('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add a New Post</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Title</label>
        <br />
        <input
          type='text'
          value={title}
          onChange={handleTitleChange}
          placeholder='Enter post title'
          style={{ width: '300px', padding: '6px', marginTop: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Body</label>
        <br />
        <textarea
          value={body}
          onChange={handleBodyChange}
          placeholder='Enter post body'
          rows={4}
          style={{ width: '300px', padding: '6px', marginTop: '4px' }}
        />
      </div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: '#1a1a2e',
          color: 'white',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Post
      </button>
    </div>
  );
};

export default AddPost;
