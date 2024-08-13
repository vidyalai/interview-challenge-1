import React, { useRef, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import WindowWidthContext from '../WindowWidthContext';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const NameEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Email = styled.div`
  font-size: 12px;
  color: #777;
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
  scrollSnapType: 'x mandatory',
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Adjust height based on your design */
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 4px solid #333;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const { isSmallerDevice } = useContext(WindowWidthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
    }
  };

  // Dummy name and email
  const name = 'Mithlesh';
  const email = 'itsyour.rohan@gmail.com';

  // Extract initials
  const firstNameLetter = name.charAt(0).toUpperCase();
  const lastNameLetter = name.split(' ').slice(-1)[0].charAt(0).toUpperCase();

  return (
    <PostContainer>
      {isLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}

      {!isLoading && (
        <>
          <AvatarContainer>
            <Avatar>{firstNameLetter}{lastNameLetter}</Avatar>
            <NameEmailContainer>
              <Name>{name}</Name>
              <Email>{email}</Email>
            </NameEmailContainer>
          </AvatarContainer>
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
            <p>{isSmallerDevice ? 'Smaller Device' : 'Larger Device'}</p>
          </Content>
        </>
      )}
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
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
