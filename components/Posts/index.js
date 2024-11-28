import React, { Component } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';
import { WindowWidthContext } from '../../context/WindowWidth';

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #808080;
    cursor: default;
  }
`;

class Posts extends Component {
  static contextType = WindowWidthContext;

  state = {
    posts: [],
    isLoading: false,
    startNumber: 0,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const { isSmallerDevice } = this.context;
    this.setState({ isLoading: true });
    try {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      this.setState({ posts, isLoading: false });
    } catch (error) {
      console.error('Error fetching posts:', error);
      this.setState({ isLoading: false });
    }
  };

  handleClick = async () => {
    const { isSmallerDevice } = this.context;
    const { startNumber } = this.state;
    this.setState({ isLoading: true });
    try {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: isSmallerDevice ? startNumber + 5 : startNumber + 10, limit: isSmallerDevice ? 5 : 10 },
      });
      this.setState(prevState => ({
        posts: [...prevState.posts, ...posts],
        startNumber: isSmallerDevice ? prevState.startNumber + 5 : prevState.startNumber + 10,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading more posts:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { posts, isLoading } = this.state;
    return (
      <Container>
        <PostListContainer>
          {posts.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </PostListContainer>

        {posts.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LoadMoreButton onClick={this.handleClick} disabled={isLoading}>
              {!isLoading ? 'Load More' : 'Loading...'}
            </LoadMoreButton>
          </div>
        )}
      </Container>
    );
  }
}

export default Posts;
