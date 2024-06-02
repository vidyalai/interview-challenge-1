import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../hooks/useWindowWidth';


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
  const [hasMorePosts, setHasMorePosts] = useState(true); 
  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); 
      try {
        const { data: newPosts } = await axios.get('/api/v1/posts', {
          params: { start: posts.length, limit: isSmallerDevice ? 5 : 10 },
        });
        if (newPosts.length === 0) {
  
          setHasMorePosts(false);
        }
        setPosts(prevPosts => [...prevPosts, ...newPosts]); 
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      } finally {
        setIsLoading(false); // Set loading state after fetching posts
      }
    };

    fetchPosts();
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
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {hasMorePosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}

