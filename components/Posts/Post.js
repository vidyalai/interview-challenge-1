import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

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
  bottom: 150,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;



const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollDistance = containerWidth;
      carouselRef.current.scrollBy({
        left: scrollDistance,
        behavior: 'smooth',
      });
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % post.images.length);
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollDistance = containerWidth;
      carouselRef.current.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth',
      });
      setCurrentImageIndex(
        prevIndex => (prevIndex - 1 + post.images.length) % post.images.length
      );
    }
  };

  return (
    <PostContainer>
    <div className='flex flex-row'>
   <div> <p>LG</p></div>
     <div><p>Leanne Graham</p>
     <p>sincere@april.biz</p></div></div>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem
              key={index}
              style={{
                transform:
                  index === currentImageIndex ? 'translateX(0)' : 'translateX(100%)',
              }}
            >
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


