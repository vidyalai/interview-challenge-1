import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useRef } from 'react';
import axios from 'axios';

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
  top: '50%', // Center button vertically relative to parent
  transform: 'translateY(-50%)', // Adjust for vertical centering
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

const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
}));

const Avatar = styled.div(({ theme }) => ({
  width: '45px',
  height: '44px',
  borderRadius: '50%',
  backgroundColor: theme.primaryColor,
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'white',
  background: 'gray',
}));

const UserName = styled.span(() => ({
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
}));

const UserEmail = styled.span(() => ({
  fontSize: '14px',
  color: '#666',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const handleNextClick = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      const scrollLeft = carousel.scrollLeft;

      let nextScrollLeft = scrollLeft + clientWidth;

      if (nextScrollLeft >= scrollWidth) {
        nextScrollLeft = 0; // Wrap around to the beginning
      }

      carousel.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth',
      });
    }
  };
  const handlePrevClick = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      const scrollLeft = carousel.scrollLeft;

      let nextScrollLeft = scrollLeft - clientWidth;

      if (nextScrollLeft < 0) {
        nextScrollLeft = scrollWidth - clientWidth; // Wrap around to the end
      }

      carousel.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth',
      });
    }
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`,
        );
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [post.userId]);

  if (!user) {
    return null; // You can return a loading state or placeholder if user data is still fetching
  }

  return (
    <PostContainer>
      <UserInfo>
        <Avatar>{`${user.name[0]}${user.name.split(' ')[1][0]}`}</Avatar>
        <div>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </div>
      </UserInfo>
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
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Post;
