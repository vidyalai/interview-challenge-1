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
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [hasmore, setHasMore] = useState(true);


  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    fetchPost();
  }, [isSmallerDevice]);


    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      const { data: usersData } = await axios.get('https://jsonplaceholder.typicode.com/users');


      const postsWithUsers = posts.map((post) => {
        const user = usersData.find((user) => user.id === post.userId);
        return {
          ...post,
          user: user || {},
        };
      })


      setPosts(postsWithUsers);
    };
    

  const handleClick = () => {
    setVisiblePosts(posts.length);
    setHasMore(false);
  };

  return (
    <Container>
      <PostListContainer>
       {posts.slice(0, visiblePosts).map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasmore && (
           <LoadMoreButton onClick={handleClick}>
           Load More
         </LoadMoreButton>
        )}
       
      </div>
    </Container>
  );
}
