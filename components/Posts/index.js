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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // const { isSmallerDevice } = useWindowWidth();
  const {isSmallerDevice} = useWindowWidth();
  // console.log("isSmallerDevice",isSmallerDevice);
  const limit = isSmallerDevice ? 6 : 11;

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: page, limit},
      });
      if(posts.length<limit-1){
        setHasMore(false);
      }
      setPosts(posts);
      console.log("posts",posts);


    };

    fetchPost();
  }, [isSmallerDevice,page,limit]);

  const handleClick = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + posts.length-1);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.slice(0,10).map(post => (
          <Post post={post} key={post.id} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMore && <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>}
      </div>
    </Container>
  );
}
