import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import NewAlbum from './NewAlbum';
import OneAlbum from './OneAlbum';
import './App.css';
import dataSource from './dataSource';

const App = () => {
  // State for search phrase entered by user
  const [searchPhrase, setSearchPhrase] = useState('');

  // State for the full list of albums fetched from the API
  const [albumList, setAlbumList] = useState([]);

  // State to track which album index is currently selected for detail view
  const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);

  // Used to trigger useEffect to re-fetch — not wired to change yet
  let refresh = false;

  // Async function to fetch all albums from the MusicAPI via Axios
  const loadAlbums = async () => {
    const response = await dataSource.get('/albums');
    setAlbumList(response.data);
  };

  // useEffect runs after render — calls loadAlbums once on mount
  // The [refresh] dependency array prevents endless re-calling
  useEffect(() => {
    loadAlbums();
  }, [refresh]);

  // Receives search phrase from SearchForm via callback and updates state
  const updateSearchResults = async (phrase) => {
    console.log('phrase is ' + phrase);
    setSearchPhrase(phrase);
  };

  // Called when user clicks OK on a Card — finds the album index and navigates to detail view
  const updateSingleAlbum = (id, navigate) => {
    console.log('Update Single Album = ', id);
    console.log('Update Single Album = ', navigate);
    var indexNumber = 0;
    for (var i = 0; i < albumList.length; ++i) {
      if (albumList[i].albumId === id) indexNumber = i;
    }
    setCurrentlySelectedAlbumId(indexNumber);
    console.log('update path', '/show/' + indexNumber);
    navigate('/show/' + indexNumber);
  };

  // Filters albumList by searchPhrase — shows all if phrase is empty
  console.log('albumList', albumList);
  const renderedList = albumList.filter((album) => {
    if (
      album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      searchPhrase === ''
    ) {
      return true;
    }
    return false;
  });

  console.log('renderedList', renderedList);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <SearchAlbum
              updateSearchResults={updateSearchResults}
              albumList={renderedList}
              updateSingleAlbum={updateSingleAlbum}
            />
          }
        />
        <Route exact path='/new' element={<NewAlbum />} />
        <Route
          exact
          path='/show/:albumId'
          element={<OneAlbum album={albumList[currentlySelectedAlbumId] || {title: '', description: '', image: ''}} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
