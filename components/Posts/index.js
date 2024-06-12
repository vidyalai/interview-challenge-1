import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidthContext } from '../context/WindowWidthContext';

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

  // state for tracking the loaded posts
  const [start, setStart] = useState(0);

  // For hiding load more button
  const [hideLoadBtn, setHideLoadBtn] = useState(false);

  const { isSmallerDevice } = useWindowWidthContext();

  // determines how many posts should be displayed on the screen
  const limitPosts = isSmallerDevice ? 5 : 10;

  const fetchPost = async () => {
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start, limit: limitPosts },
    });

    /**
     * a total of 100 posts will be returned by this api call.
     * after 100 posts then api will return empty array
     * start > 0 indicates we have fetched enough data and not staying in the beginning
     * once start > 0 and posts become empty array which means there is no further posts available so we can hide button
     */
    if (start > 0 && posts.length === 0) {
      setHideLoadBtn(true);
    }

    setPosts(prev => [...prev, ...posts]);
  };

  useEffect(() => {
    // handling error + fetching posts
    try {
      fetchPost();
    } catch (error) {
      console.error(error.message);
    }
  }, [start, isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);

    setStart(prev => prev + limitPosts);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.length > 0 &&
          posts.map(post => <Post post={post} key={post.id} />)}
      </PostListContainer>

      {!hideLoadBtn && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
