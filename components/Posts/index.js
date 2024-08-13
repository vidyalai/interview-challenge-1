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

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(5); // Initial limit
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { isSmallerDevice } = useWindowWidth();

  const fetchPosts = async (start, limit) => {
    try {
      const { data: newPosts } = await axios.get('/api/v1/posts', {
        params: { start, limit },
      });

      if (newPosts.length < limit) {
        setHasMorePosts(false);
      }

      const postsWithImages = await Promise.all(
        newPosts.map(async post => {
          const { data: images } = await axios.get(
            'https://jsonplaceholder.typicode.com/albums/1/photos'
          );
          return { ...post, images };
        })
      );

      setPosts(prevPosts => [...prevPosts, ...postsWithImages]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
      setInitialLoadComplete(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPosts(0, limit);
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);
    await fetchPosts(start + limit, limit);
    setStart(prevStart => prevStart + limit);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {initialLoadComplete && hasMorePosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
