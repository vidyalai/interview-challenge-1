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
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { isSmallerDevice } = useWindowWidth();
  const limit = isSmallerDevice ? 5 : 10;

  const fetchPosts = async (start) => {
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start, limit },
    });

    const { data: photos } = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos');

    const postsWithImages = posts.map((post, index) => {
      const globalIndex = start + index;
      const startIdx = (globalIndex * 3) % photos.length;
      const endIdx = (globalIndex * 3 + 3) % photos.length;
      const postImages = Array.from({ length: 3 }, (_, i) => {
        const idx = (startIdx + i) % photos.length;
        return photos[idx].url;
      });

      return { ...post, images: postImages };
    });

    return postsWithImages;
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true);
      const initialPosts = await fetchPosts(0);
      setPosts(initialPosts);
      setIsLoading(false);
    };

    loadInitialPosts();
  }, [isSmallerDevice]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const newStart = start + limit;
    const morePosts = await fetchPosts(newStart);

    if (morePosts.length < limit) {
      setHasMore(false);
    }

    setPosts((prevPosts) => [...prevPosts, ...morePosts]);
    setStart(newStart);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </PostListContainer>
      {posts.length > 0 && hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}