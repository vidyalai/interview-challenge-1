import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
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
  scrollSnapType: 'x mandatory',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
  position: 'relative',
}));

const ProfileSection = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f9f9f9',
}));

const ProfileImage = styled.img(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '10px',
}));

const ProfileInfo = styled.div(() => ({
  fontSize: '14px',
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
  transform: 'translateY(-50%)',
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
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      setItemWidth(carouselRef.current.children[0].offsetWidth);
    }
  }, [carouselRef]);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <ProfileSection>
                <ProfileImage src={image.url} alt={`${post.userName}'s profile`} />
                <ProfileInfo>
                  <div>{post.userName}</div>
                  <div>{post.userEmail}</div>
                </ProfileInfo>
              </ProfileSection>
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
    title: PropTypes.string,
    body: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      }),
    ),
    profileImage: PropTypes.string, // Added profile image URL
    userName: PropTypes.string,      // Added user name
    userEmail: PropTypes.string,     // Added user email
  }).isRequired,
};

export default Post;
