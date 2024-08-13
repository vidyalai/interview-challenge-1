import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
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
  const [users, setUsers] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: usersData } = await axios.get('/api/v1/users');
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/api/v1/posts', {
          params: {
            start: page * (isSmallerDevice ? 5 : 10),
            limit: isSmallerDevice ? 5 : 10,
          },
        });

        const postsWithUserData = data.map((post, index) => {
          const user = users[index % users.length];
          return {
            ...post,
            userName: user?.name || 'Unknown', 
            userEmail: user?.email || 'Unknown',
          };
        });

        if (postsWithUserData.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...postsWithUserData]);
          setHasMore(postsWithUserData.length === (isSmallerDevice ? 5 : 10));
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
       
      } finally {
        setIsLoading(false);
      }
    };

    if (users.length > 0) {
      fetchPosts();
    }
  }, [page, isSmallerDevice, users]);

  const handleClick = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
