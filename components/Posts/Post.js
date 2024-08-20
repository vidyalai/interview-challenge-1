import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { formatUserName, formatUserEmail } from '../utils/formatUser';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const Header = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc',
  backgroundColor: '#f8f9fa',
}));

const InitialsCircle = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#6c757d',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginRight: '10px',
}));

const UserDetails = styled.div(() => ({
  color: '#555',
  fontStyle: 'italic',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  willChange: 'transform',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 100%',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
  display: 'block',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const ErrorMessage = styled.div(() => ({
  marginTop: '10px',
  color: 'red',
  fontStyle: 'italic',
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post, user, error }) => {
  const carouselRef = useRef(null);
  const currentIndex = useRef(0);
  

  const handleNextClick = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      currentIndex.current = Math.min(currentIndex.current + 1, post.images.length - 1);
      carouselRef.current.style.transform = `translateX(-${width * currentIndex.current}px)`;
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      currentIndex.current = Math.max(currentIndex.current - 1, 0);
      carouselRef.current.style.transform = `translateX(-${width * currentIndex.current}px)`;
    }
  };

  return (
    <div>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
      <PostContainer>
            <Header key={user.id}>
              <InitialsCircle>{formatUserName(user.name)}</InitialsCircle>
              <UserDetails>{formatUserEmail(user.email)}</UserDetails>
            </Header>
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
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
