import React from 'react';
import { useParams } from 'react-router-dom';

// Reads the :username route parameter and displays a greeting
const User = (props) => {
  let { username } = useParams();
  console.log(props);
  return (
    <div>
      <h2>Hello {username}</h2>
    </div>
  );
};

export default User;
