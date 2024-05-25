import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const UserContainer = styled.div(() => ({
  display: "flex",
  padding: "5px",
  gap: "10px"
}));

const Logo = styled.div(() => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "gray",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px"
}));

const UserDetail = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly"
}))

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

const getInitialLetters = (name) => {
  const nameArray = name.split(' ');
  const initial = nameArray[0][0] + nameArray[nameArray.length - 1][0];
  return initial;
}

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/v1/users/user/${post.userId}`);
      const initials = getInitialLetters(data.name);
      setUser({initials, name: data.name, email: data.email});
    }
    fetchUser();
  }, []);

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
        <Logo>{user?.initials}</Logo>
        <UserDetail>
          <p style={{fontWeight: 'bold'}}>{user?.name}</p>
          <p>{user?.email}</p>
        </UserDetail>
      </UserContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image} alt={post.title} />
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
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.any,
  }),
};

export default Post;
