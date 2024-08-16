import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from '@emotion/styled';

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
}));

const Avatar = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#fff',
}));

const UserInfo = styled.div(() => ({
  marginLeft: '10px',
}));

const UserName = styled.h3(() => ({
  margin: 0,
  fontSize: '16px',
  fontWeight: 'bold',
}));

const UserEmail = styled.p(() => ({
  margin: 0,
  fontSize: '14px',
  color: '#555',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <PostContainer>
      <Header>
        <Avatar>LG</Avatar>
        <UserInfo>
          <UserName>Leanne Graham</UserName>
          <UserEmail>Sincere@april.biz</UserEmail>
        </UserInfo>
      </Header>
      <CarouselContainer>
        <Image src={post.images[currentIndex]} alt={post.title} />
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
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Post;