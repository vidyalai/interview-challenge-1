import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useCustomHook from './custom_hook';

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
    color: '#000', // Change to black
  },
  '& > p': {
    color: '#000', // Change to black
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
  position: absolute;
  bottom: 35%; // Position buttons 50% from the bottom
  transform: translateY(-50%); // Offset buttons vertically by half their height
  left: 10px;
`;

const NextButton = styled(Button)`
  position: absolute;
  bottom: 35%;
  transform: translateY(-50%);
  right: 10px;
`;

const Header = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc',
}));

const Circle = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#007BFF',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  marginRight: '10px',
}));

const UserDetails = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserName = styled.div(() => ({
  fontWeight: 'bold',
  color: '#000', // Change to black
}));

const UserEmail = styled.div(() => ({
  color: '#000', // Change to black
}));

const Post = ({ post, postIndex }) => {
  const carouselRef = useRef(null);
  const users = useCustomHook(post);

  console.log('Users:', users);
  console.log('Post index:', postIndex);

  const user = users[postIndex] || { name: 'Unknown', email: 'Unknown' };

  console.log('User for this post:', user);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const imageWidth = carouselRef.current.firstChild.offsetWidth; // Get first child's width
      carouselRef.current.scrollBy({
        left: imageWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const imageWidth = carouselRef.current.firstChild.offsetWidth;
      carouselRef.current.scrollBy({
        left: -imageWidth,
        behavior: 'smooth',
      });
    }
  };

  const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ');
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
  };

  return (
    <PostContainer>
      <Header>
        <Circle>{getInitials(user.name)}</Circle>
        <UserDetails>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserDetails>
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
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  postIndex: PropTypes.number.isRequired,
};

export default Post;
