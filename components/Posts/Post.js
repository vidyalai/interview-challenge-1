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
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 50%;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  console.log(post);
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
  const getInitials = name => {
    const nameParts = name.split(' ');
    const initials = nameParts
      .map(part => part.charAt(0).toUpperCase())
      .join('');
    return initials;
  };

  return (
    <PostContainer>
      <CarouselContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            gap: '5px',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              background: 'black',
              color: 'white',
              padding: '10px 10px',
              borderRadius: '50%',
            }}
          >
            {getInitials(post.userDetails.name)}
          </div>
          <div>
            <p>{post.userDetails.name}</p>
            <p>{post.userDetails.email}</p>
          </div>
        </div>

        <Carousel ref={carouselRef}>
          {post.postImages.map((image, index) => (
            <CarouselItem key={index}>
              {/* <p>{image.albumId}</p> */}
              <Image src={image.url} alt={image.title} />
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
