import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';
import { fetchPosts } from '../../server/posts/posts.service';

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
  const [users, setUsers] = useState({});
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 5;

  const { isSmallerDevice } = useWindowWidth();



  useEffect(() => {
    const fetchPostsData = async () => {
      setIsLoading(true);
      const { data: initialPosts } = await axios.get('/api/v1/posts', {
        params: { start, limit: isSmallerDevice ? 5 : 10 },
      });
      

      const userIds = [...new Set(initialPosts.map(post => post.id))]; 
      const userPromises = userIds.map(userId => axios.get(`/api/v1/users/${userId}`));
      const usersData = await Promise.all(userPromises);

     
      const usersMap = usersData.reduce((acc, userResponse) => {
        acc[userResponse.data.id] = userResponse.data;
        return acc;
      }, {});

      setPosts(prevPosts => [...prevPosts, ...initialPosts]);
      setUsers(usersMap);
      setIsLoading(false);
    };

    fetchPostsData();
  }, [start, isSmallerDevice]);


 
  const handleClick = async () => {
    setIsLoading(true);
  const newStart = start + limit; 
  const newPosts = await fetchPosts(newStart, limit);
  console.log('New Posts:', newPosts);
  setPosts([]); 
  setPosts(newPosts); 
  await setStart(newStart); 
  setIsLoading(false);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
 
  

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} user={users[post.id]} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}