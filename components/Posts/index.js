import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

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
let INITIAL = true;
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parameter, setParameter] = useState(0);
  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get('/api/v1/posts', {
        params: { start: parameter, limit: isSmallerDevice ? 5 : 10 },
      });
      if (INITIAL) {
        setPosts(data);
        INITIAL = false;
      } else {
        setPosts(prevPosts => [...prevPosts, ...data]);
      }
    };
    fetchPost();
  }, [isSmallerDevice, parameter]);

  const handleClick = async () => {
    setIsLoading(true);
    setParameter(prev => prev + (isSmallerDevice ? 5 : 10))
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
