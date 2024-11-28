import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const UserContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  display: flex;
  gap: 10px;

  .pic-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: grey;
    color: white;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    font-size: 1rem;
    vertical-align: middle;
  }
  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-weight: bolder;
    }
  }
`;

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data: userData } = await axios.get(
        `/api/v1/users/${post.userId}`,
      );

      setUser(userData);
    })();
  }, [post.userId]);

  const { name, email } = user;

  const letters = name
    ?.split(' ')
    .map(word => word[0])
    .join('');

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <UserContainer>
        <div className={'pic-container'}>{letters}</div>
        <div className={'info-container'}>
          <div className={'name'}>{name}</div>
          <div>{email}</div>
        </div>
      </UserContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.any,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        map: PropTypes.func,
      }),
    ),
    title: PropTypes.any,
    userId: PropTypes.any,
  }),
};

export default Post;
