import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../store/WindowWidth';

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

const fetchPost = async (parameter, limit) => {
  const { data } = await axios.get('/api/v1/posts', {
    params: { start: parameter, limit: limit },
  });
  return data
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5)
  const { isSmallerDevice } = useContext(WindowWidthContext);

  useEffect(() => {
    setLimit(isSmallerDevice ? 5 : 10);
    const fetchInitialPost = async () => {
      const data = await fetchPost(0, isSmallerDevice ? 5 : 10);
      setPosts(data);
    }
    fetchInitialPost();
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);
    const data = await fetchPost(posts.length, limit);
    setPosts(prev => [...prev, ...data]);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {
        posts.length != 100 &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      }
    </Container>
  );
}
