import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  // handleLogin calls the parent's onClick prop (handleLogin in App.js)
  // passing 'from' (where user came from) and 'navigate' (router navigation function)
  const handleLogin = () => {
    console.log('handleLogin from ', from);
    console.log('handleLogin navigate ', navigate);
    props.onClick(from, navigate);
  };

  console.log('in LoginPage', props);

  // useNavigate returns a navigation function for programmatic routing
  let navigate = useNavigate();

  // useLocation returns the current location object including state
  let location = useLocation();

  // Determine where the user was trying to go before being redirected to login
  let state = location.state;
  let from = state?.from?.pathname ? state.from.pathname : '/';
  let text = '';
  if (from !== '/') text = <h3>You must login to visit "{from}"</h3>;

  return (
    <div>
      {text}
      <button onClick={() => handleLogin()}>Login Here</button>
    </div>
  );
};

export default LoginPage;
