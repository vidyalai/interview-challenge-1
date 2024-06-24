import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../../context/WindowWidthContext';
import ClientOnly from '../ClientOnly';

// Styled components for styling purposes
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

// Main component to display posts
export default function Posts() {
  const { isSmallerDevice } = useWindowWidth();

  return (
    <ClientOnly>
      <PostsContent isSmallerDevice={isSmallerDevice} />
    </ClientOnly>
  );
}

// PostsContent component handles fetching and displaying posts
const PostsContent = ({ isSmallerDevice }) => {
  const [posts, setPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [start, setStart] = useState(0); 
  const [hasMorePosts, setHasMorePosts] = useState(true); 
  const limit = isSmallerDevice ? 5 : 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/api/v1/posts', {
          params: { start: 0, limit }, 
        });
        setPosts(data); 
        setStart(data.length); 
        setHasMorePosts(data.length === limit); // Determine if there are more posts to load based on fetched data length
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts(); // Initial fetch when component mounts or when isSmallerDevice changes
  }, [isSmallerDevice]);

  // Function to handle "Load More" button click
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data: newPosts } = await axios.get('/api/v1/posts', {
        params: { start, limit },
      });
      setPosts(prevPosts => [...prevPosts, ...newPosts]); 
      setStart(prevStart => prevStart + newPosts.length); 
      setHasMorePosts(newPosts.length === limit); 
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} /> // Render each post using the Post component
        ))}
      </PostListContainer>

      {/* Render "Load More" button if there are more posts to load */}
      {hasMorePosts && (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}{' '}
            
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
};
