import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import EditAlbum from './EditAlbum';
import OneAlbum from './OneAlbum';
import './App.css';
import dataSource from './dataSource';

const App = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [albumList, setAlbumList] = useState([]);
  const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);

  let refresh = false;

  const loadAlbums = async () => {
    const response = await dataSource.get('/albums');
    setAlbumList(response.data);
  };

  useEffect(() => {
    loadAlbums();
  }, [refresh]);

  const updateSearchResults = async (phrase) => {
    console.log('phrase is ' + phrase);
    setSearchPhrase(phrase);
  };

  // Updated to accept uri parameter to determine 'show' or 'edit' path
  const updateSingleAlbum = (id, navigate, uri) => {
    console.log('Update Single Album = ', id);
    var indexNumber = 0;
    for (var i = 0; i < albumList.length; ++i) {
      if (albumList[i].albumId === id) indexNumber = i;
    }
    setCurrentlySelectedAlbumId(indexNumber);
    console.log('update path', uri + indexNumber);
    navigate(uri + indexNumber);
  };

  // Called after creating or editing an album — reloads the album list
  const onEditAlbum = () => {
    loadAlbums();
  };

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
        {/* Main search and album list page */}
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

        {/* Create new album — no album prop means EditAlbum is in create mode */}
        <Route
          exact
          path='/new'
          element={<EditAlbum onEditAlbum={onEditAlbum} />}
        />

        {/* Edit existing album — album prop triggers edit mode */}
        <Route
          exact
          path='/edit/:albumId'
          element={
            <EditAlbum
              album={albumList[currentlySelectedAlbumId]}
              onEditAlbum={onEditAlbum}
            />
          }
        />

        {/* Album detail view with tracks, lyrics, and video */}
        <Route
          exact
          path='/show/:albumId'
          element={
            <OneAlbum
              album={albumList[currentlySelectedAlbumId] || { title: '', description: '', image: '', tracks: [] }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
