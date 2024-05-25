import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
// import useWindowWidth from '../hooks/useWindowWidth';
import { useWindowWidth } from '../hooks/WindowWithContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [morePost, setMorePosts] = useState(true);
  const [limit, setLimit] = useState(10);
  const { isSmallerDevice } = useWindowWidth;

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      setMorePosts(posts.length === (isSmallerDevice ? 5 : limit));

      const { data: users } = await axios.get('/api/v1/users', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      const { data: photos } = await axios.get(
        'https://jsonplaceholder.typicode.com/albums/1/photos',
        {
          params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
        },
      );
      const postsWithPhotos = posts.map(post => ({
        ...post,
        photo: photos.find(photo => photo.id === post.id),
        user: users.find(user => user.id === post.id),
      }));

      setPosts(postsWithPhotos);
    };

    fetchPost();
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {morePost && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
