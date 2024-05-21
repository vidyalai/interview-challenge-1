import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext  } from '../context/WindowWidthContext'; 


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
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { isSmallerDevice } = useContext(WindowWidthContext);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
          params: { start, limit: isSmallerDevice ? 5 : limit },
        });
        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
        setHasMorePosts(fetchedPosts.length === (isSmallerDevice ? 5 : limit));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [start, isSmallerDevice, limit]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    setStart((prevStart) => prevStart + limit);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMorePosts && (
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}