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
  top:140px
`;

const NextButton = styled(Button)`
  right: 10px;
  top:140px
`;

const UserName = styled.h3(() => ({
  padding: '10px',
  boxSizing: 'border-box',
  marginTop: '10px',
  marginLeft: '10px',
  color: 'white',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: 'gray',
}));

const UserInfo = styled.div(()=>({
  display:'flex',
}));

const NameOfUser = styled.div(()=>({
  margin: '10px'
}));

const DisplayName = styled.div(()=>({
  fontSize: '20px',
  fontWeight:'bold'
}));



const Namemail = styled.h4(()=>({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '20px',
  color: 'black',
}));

const Email = styled.p(()=>({
  color: 'black',
  fontWeight: 'normal',
}));




const Post = ({ post }) => {
  const carouselRef = useRef(null);
console.log(post);
  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, /* 50 */
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,  /*-70 */
        behavior: 'smooth',
      });
    }
  };

  const formatUserName = (name) => {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts[1] ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <PostContainer>
      <UserInfo>
      <UserName>
      <h3>{formatUserName(post.user.name)}</h3>
      </UserName>
      <NameOfUser>
      <DisplayName>{post.user.name}</DisplayName>
          <div>{post.user.email}</div>
      </NameOfUser>
          
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
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
