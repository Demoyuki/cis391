import React from 'react';
import Counter from './Counter';

// This is a functional component
const App = () => {
  return (
    <div>
      This is the first page of the app
      <Counter title="1st Counter" />
      <Counter title="2nd Counter" />
      <Counter title="3rd Counter" />
    </div>
  );
};

export default App;