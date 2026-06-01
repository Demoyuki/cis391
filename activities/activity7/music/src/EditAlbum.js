import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

// EditAlbum handles both Create and Edit modes.
// If props.album is present, we are in edit mode.
// If props.album is absent, we are in create mode.
const EditAlbum = (props) => {
  const navigate = useNavigate();

  // Determine if we are editing an existing album or creating a new one
  const isEditMode = props.album != null;

  // Pre-populate form fields from props.album if in edit mode
  const [title, setTitle] = useState(isEditMode ? props.album.title : '');
  const [artist, setArtist] = useState(isEditMode ? props.album.artist : '');
  const [description, setDescription] = useState(
    isEditMode ? props.album.description : ''
  );
  const [year, setYear] = useState(isEditMode ? props.album.year : '');
  const [image, setImage] = useState(isEditMode ? props.album.image : '');

  // onChange handlers
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  // Saves the album via POST (create) or PUT (edit)
  const saveAlbum = async (album) => {
    if (isEditMode) {
      await dataSource.put('/albums', album);
    } else {
      await dataSource.post('/albums', album);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const album = {
      albumId: isEditMode ? props.album.albumId : 0,
      title,
      artist,
      description,
      year,
      image,
      tracks: isEditMode ? props.album.tracks : [],
    };

    await saveAlbum(album);

    props.onEditAlbum();
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                {isEditMode ? 'Edit Album' : 'Create New Album'}
              </h2>

              <form onSubmit={handleFormSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Artist</label>
                  <input
                    type="text"
                    className="form-control"
                    value={artist}
                    onChange={handleArtistChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows="4"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    value={year}
                    onChange={handleYearChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    onChange={handleImageChange}
                  />
                </div>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {isEditMode ? 'Save Changes' : 'Create Album'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAlbum;