import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import {useWindowWidthContext} from '../hooks/useWindowWidth'

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
  // console.log(posts);
  const { isSmallerDevice } = useWindowWidthContext();

  const [start, setStart] = useState(0); 
  const [limit,setLimit]=useState(10);
  const fetchPosts = async (params) => {
    const { start = 0, limit = 10 } = params || {};
    const { data: posts } = await axios.get('/api/v1/posts',
      {
        params: {
          _start: start,
          _limit: limit,
        },
      },
    );
    return posts;
  };
  const loadPosts = async (start, limit) => {
    setIsLoading(true);
    const newPosts = await fetchPosts({ start, limit });
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setIsLoading(false);
  };
  useEffect(() => {
    loadPosts(0, limit);
  }, [limit, isSmallerDevice]);

  const handleClick = () => {
    const newStart = start + limit;
    setStart(newStart);
    loadPosts(newStart, limit);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post,index) => (
          <Post post={post} index={index} />
        ))}
      </PostListContainer>
        
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading||posts.length==0}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}
