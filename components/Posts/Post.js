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

const Profile = styled.div(() => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
}));
const Details = styled.div(() => ({
  '& > h1': {
    fontSize: '15px',
    padding: '0 10px',
  },
  '& > h2': {
    fontSize: '10px',
    fontWeight: '200',
    padding: '0 10px',
  },
}));

const RoundImage = styled.div(() => ({
  borderRadius: '50%',
  height: '40px',
  width: '40px',
  backgroundColor: '#808080',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  color: '#fff',
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
  margin-bottom: 50%;
`;

const NextButton = styled(Button)`
  right: 10px;
  margin-bottom: 50%;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

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
      <Profile>
        <RoundImage>LG</RoundImage>
        <Details>
          <h1>Leanne Graham</h1>
          <h2>Sincere@april.biz</h2>
        </Details>
      </Profile>
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
