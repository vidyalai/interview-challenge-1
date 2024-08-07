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
  padding: '20px',
}));

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: postsData } = await axios.get('/api/v1/posts');
      setPosts(postsData);
    };

    const fetchUsers = async () => {
      const { data: usersData } = await axios.get('/api/v1/users');
      setUsers(usersData);
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const findUser = (userId) => {
    return users.find((user) => user.id === userId) || {};
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <Post key={post.id} post={post} user={findUser(post.userId)} />
        ))}
      </PostListContainer>
    </Container>
  );
};

export default Posts;
