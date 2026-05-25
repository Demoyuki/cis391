import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// PrivateRoute protects routes that require authentication.
// If authorized, renders the child component.
// If not authorized, redirects to /login and saves the requested location in state
// so the user can be sent there after a successful login.
const PrivateRoute = (props) => {
  const authorized = props.authorized;
  const location = useLocation();
  console.log('in PrivateRoute', props);
  console.log('in PrivateRoute', location);
  console.log('in PrivateRoute auth ', authorized);

  return authorized ? (
    props.children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

export default PrivateRoute;
