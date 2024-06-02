import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth, { WindowWidthContext } from '../hooks/WindowWidthContext';

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
  const [isLoading, setIsLoading] = useState(true);
  const [ hideLoadMoreButton, setHideLoadMoreButton ] = useState(false);

  const { isSmallerDevice } = useContext(WindowWidthContext);

  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: newPosts } = await axios.get('/api/v1/posts', {
          params: { start: page * (isSmallerDevice ? 5 : 10), limit: isSmallerDevice ? 5 : 10 },
        });

        setPosts([...posts, ...newPosts]);
        setIsLoading(false);
        if(page*(isSmallerDevice ? 5 : 10) === posts.length+(isSmallerDevice ? 5 : 10) && !hideLoadMoreButton) { // handles if no new posts are fetched on load more posts but still page is increased
          setPage(page - 1)
        }
        if (newPosts.length === 0) {
          setHideLoadMoreButton(true);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [page, isSmallerDevice]);

  const handleClick = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      {!hideLoadMoreButton && <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>}
    </Container>
  );
}
