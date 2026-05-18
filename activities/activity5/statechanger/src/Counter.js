import React, { useState } from 'react';
import './Counter.css';

const Counter = (props) => {
  // useState hook — tracks click count, initialized to 0
  const [clicks, setClicks] = useState(0);

  // useState hook — tracks message input, initialized to the title prop
  const [message, setMessage] = useState(props.title);

  // Increments click count when button is clicked
  const addOneClick = () => {
    setClicks(clicks + 1);
  };

  // Updates message state on every keystroke
  const handleNewMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className='one-box'>
      <h1>{props.title}</h1>
      <h2>clicks: {clicks}</h2>
      <h3>message: {message}</h3>
      <input
        type='text'
        value={message}
        onChange={handleNewMessage}
      />
      <button onClick={addOneClick}>Click Me</button>
    </div>
  );
};

export default Counter;