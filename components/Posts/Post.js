import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';


const ProfileImage = styled.img(() => ({
  width: '40px',
  marginTop: '2%',
  marginLeft: '10px',
  borderRadius: '50%',
  overflow: 'hidden',
  filter: 'grayscale(100%)'
}));

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
  position: absolute;
  transform: translateY(-10%);
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 50%;
  position: absolute;
  transform: translateY(-10%);
`;

const WritterName = styled.div(()=>({
}))
const WritterEmail = styled.div(()=>({
}))

const Details = styled.div(()=>({
  display: 'flex',
  gap: '5%'
}))

const WritterWrapper = styled.div(()=>({
  display: 'flex',
  flexDirection: 'column',
}))

const Post = ({ post }) => {
  const carouselRef = useRef(null);

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
      <CarouselContainer>
        
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <div>

            
            <Details>
            <ProfileImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${post.user.name}`} alt={post.title} />
            <WritterWrapper>
              <WritterName>{post?.user?.name}
              </WritterName>
              <WritterEmail>{post?.user?.email}</WritterEmail>
            </WritterWrapper>
            </Details>
            <CarouselItem key={index}>
              
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
            </div>
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
