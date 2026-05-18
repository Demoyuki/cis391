import React, { useState } from 'react';
import Card from './Card';
import './App.css';

const App = () => {
  // albumList is the state variable holding all albums.
  // setAlbumList is ready to update this from a live API call in Activity 6.
  const [albumList, setAlbumList] = useState([
    {
      artistId: 0,
      artist: 'My Chemical Romance',
      title: 'The Black Parade',
      description:
        'The third studio album by My Chemical Romance, released October 23, 2006. A concept album centered on a dying man known as The Patient, blending emo, alternative rock, and glam rock.',
      year: 2006,
      image:
           'https://m.media-amazon.com/images/I/61VJjmbjZOL._SX300_SY300_QL70_FMwebp_.jpg',
    },
    {
      artistId: 1,
      artist: 'The Beatles',
      title: 'Abbey Road',
      description:
        'Abbey Road is the eleventh studio album by the English rock band the Beatles, released on 26 September 1969. It features iconic tracks Come Together and Here Comes the Sun.',
      year: 1969,
      image:
        'https://m.media-amazon.com/images/I/613XEge8jRL._SY300_SX300_QL70_FMwebp_.jpg'
    },
    {
      artistId: 2,
      artist: 'Michael Jackson',
      title: 'Thriller',
      description:
        'Thriller is the sixth studio album by Michael Jackson, released November 30, 1982. It is the best-selling album of all time.',
      year: 1982,
      image:
        'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
    },
  ]);

  // renderedList uses the map function to transform each album into a Card component
  const renderedList = () => {
    return albumList.map((album) => {
      return (
        <Card
          key={album.artistId}
          albumTitle={album.title}
          albumDescription={album.description}
          buttonText='OK'
          imgURL={album.image}
        />
      );
    });
  };

  return (
    <div>
      <h1>Music I like</h1>
      <div className='container'>{renderedList()}</div>
    </div>
  );
};

export default App;