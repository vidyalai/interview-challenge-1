import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import {useWindowWidth} from '../hooks/useWindowWidth';

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
  const { isSmallerDevice } = useWindowWidth();
  const [start, setStart] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [remainData, setRemainData] = useState(true);
  const limit = isSmallerDevice ? 5 : 10;

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit },
      });
      setPosts(posts);
      setStart(posts.length);
      setTotalPosts(posts.length);
    };

    fetchInitialPosts();
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const { data: newPosts } = await axios.get('/api/v1/posts', {
        params: { start, limit },
      });

      if (newPosts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setStart(prevStart => prevStart + newPosts.length);
        setTotalPosts(prevTotal => prevTotal + newPosts.length);
      }

      if (newPosts.length < limit) {
        setRemainData(false);
      }
    } catch (error) {
      console.error('Unableto load remaining posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      {remainData
       && 
      (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )
      }
    </Container>
  );
}
