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

const UserInfoContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px',
  
}));

const Avatar = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginRight: '10px',
}));

const UserDetails = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const UserName = styled.span(() => ({
  fontWeight: 'bold',
}));

const UserEmail = styled.span(() => ({
  fontSize: '0.8rem',
  color: '#555',
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
  console.log("Post", post);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const handleNextClick = () => {
    if (carouselRef.current) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
      carouselRef.current.scrollTo({
        left: (currentIndex + 1) * 300, // Assuming image width is 300px
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length);
      carouselRef.current.scrollTo({
        left: (currentIndex - 1) * 300, // Assuming image width is 300px
        behavior: 'smooth',
      });
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    const firstInitial = names[0][0];
    const lastInitial = names[names.length - 1][0];
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <PostContainer>
      <UserInfoContainer>
      {/* static because there is not name and email provided in the api response  */}
        <Avatar>{getInitials('Leanne Graham')}</Avatar>   
        <UserDetails>
          <UserName>Leanne Graham</UserName>
          <UserEmail>Sincere@april.biz</UserEmail>
        </UserDetails>
      </UserInfoContainer>
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
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default Post;