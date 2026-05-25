import axios from 'axios';

// Axios instance configured to point to the Express MusicAPI server
// Make sure MusicAPI is running on port 5000 before starting the React app
export default axios.create({
  baseURL: 'http://localhost:5000'
});
