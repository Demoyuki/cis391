import React, { useState } from 'react';
import Post from './Post';
import AddPost from './AddPost';

const App = () => {
  // State for the list of blog posts
  const [postList, setPostList] = useState([
    { postId: 1, title: 'First Post', body: 'This is the first blog post.' },
    { postId: 2, title: 'Second Post', body: 'This is the second blog post.' },
    { postId: 3, title: 'Third Post', body: 'This is the third blog post.' },
  ]);

  // State to track the next postId to assign
  const [postId, setPostId] = useState(4);

  // Removes a post from the list by filtering out the matching id
  const handleDeletePost = (id) => {
    const updatedPostList = postList.filter((post) => post.postId !== id);
    setPostList(updatedPostList);
  };

  // Adds a new post to the list using spread syntax to avoid mutating state
  const handleAddPost = (title, body) => {
    const newPost = { postId: postId, title: title, body: body };
    setPostList((currentList) => [...currentList, newPost]);
    setPostId(postId + 1);
  };

  // Map each post in postList to a Post component
  const posts = postList.map((post) => {
    return (
      <Post
        key={post.postId}
        postNumber={post.postId}
        title={post.title}
        body={post.body}
        onDelete={handleDeletePost}
      />
    );
  });

  return (
    <div>
      <h1>My Blog</h1>
      <AddPost onAdd={handleAddPost} />
      <hr />
      {posts}
    </div>
  );
};

export default App;
