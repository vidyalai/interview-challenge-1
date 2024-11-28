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
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '24px',
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  zIndex: '1',
  opacity: '0.8',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: '1',
  },
}));

const PrevButton = styled(Button)`
  left: 0;
`;

const NextButton = styled(Button)`
  right: 0;
`;

const UserContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
}));

const ProfileImage = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#008000',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '15px',
  marginLeft: '15px',
  marginTop: '15px',
  fontSize: '20px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
}));

const UserName = styled.div(() => ({
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '15px',
}));

const UserEmail = styled.div(() => ({
  fontSize: '12px',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };
  
  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };
  

  const name = post.user?.name || 'Unknown User';
  const email = post.user?.email || 'unknown@example.com';

  const nameParts = name.split(' ');
  const initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`;

  return (
    <PostContainer>
      <UserContainer>
        <ProfileImage>{initials}</ProfileImage>
        <div>
          <UserName>{name}</UserName>
          <UserEmail>{email}</UserEmail>
        </div>
      </UserContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
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
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
    })),
  }),
};

export default Post;
