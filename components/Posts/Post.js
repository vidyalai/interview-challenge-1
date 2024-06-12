import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

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
  top: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',

  // moving the carousel navigation to vertically center position
  transform: 'translateY(-50%)',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Details = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  gap: '10px',
}));

const CircleContainer = styled.div(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '100%',
  backgroundColor: '#999696',
  color: '#fff',
  fontSize: '20px',
  fontWeight: '650',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const DetailsContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const NameContainer = styled.div(() => ({
  color: 'black',
  fontWeight: '700',
  fontSize: '18px',
}));

const EmailContainer = styled.div(() => ({
  color: 'black',
  fontSize: '15px',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const splitUserName = post.user.name.split(' ');

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 50,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <Details>
        <CircleContainer>
          {splitUserName[0][0]}
          {splitUserName[1][0]}
        </CircleContainer>
        <DetailsContainer>
          <NameContainer>{post.user.name}</NameContainer>
          <EmailContainer>{post.user.email}</EmailContainer>
        </DetailsContainer>
      </Details>
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
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
