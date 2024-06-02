import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

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
  scrollSnapType: 'x mandatory', // Snap to the start of each item
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const ImageStyled = styled(Image)(() => ({
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

const Heading1=styled.div(()=>({
  display: 'flex',
  flexDirection: 'row',
  alignItems:'center',
}));
const Data1=styled.div(()=>({
  display: 'flex',
  flexDirection: 'column',
  margin:'2%'
}));
const Icon1=styled.div(()=>({
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  width:'25%',
  backgroundColor:'grey',
  padding:'0',
  borderRadius:'50%',
  width:'60px',
  height:'60px',
  color:'white',
  margin:'5px',
  fontSize:'25px',
  fontWeight:'bolder',
  color:'white'
}));
const Name=styled.div(()=>({
  display: 'flex',
  fontWeight:'bolder'
}));
const Email=styled.div(()=>({
  display: 'flex',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(post.images.slice(0, 2));
  const [loadingStates, setLoadingStates] = useState(Array(loadedImages.length).fill(true));

  const handleImageLoad = (index) => {
    setLoadingStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 50,
        behavior: 'smooth',
      });
    }
    loadMoreImages();
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -70,
        behavior: 'smooth',
      });
    }
  };

  const loadMoreImages = () => {
    const remainingImages = post.images.slice(loadedImages.length, loadedImages.length + 1);// Get the remaining images to load
    if (remainingImages.length > 0) {
      // Get the next image to load
      const nextImage = remainingImages[0];
      setLoadedImages(prevImages => [...prevImages, nextImage]); // Add the next image to the loaded images array
      setLoadingStates(prevStates => [...prevStates, true]); // Add a loading state for the next image
    }
  };

  return (
    <PostContainer>
      <Heading1>
        <Icon1 >
          {post.user.name.split(' ').map((part, index, arr) => index === 0 || index === arr.length - 1 ? part[0] : '').join('').toUpperCase()}
        </Icon1>
        <Data1>
          <Name >{post.user.name}</Name>
          <Email>{post.user.email}</Email>
        </Data1>
      </Heading1>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {loadedImages.map((image, index) => (
            <CarouselItem key={index}>
              {loadingStates[index] && <p>Loading...</p>}
              <ImageStyled
                src={image.url}
                alt={post.title}
                width={300}
                height={300}
                onLoad={() => handleImageLoad(index)}
                onError={(e) => {
                  if (e.target.status === 504) {
                    // on a timeout error remove the timed out image from loaded images and add it back to the end of the list for better image optimisation
                    post.images.push(image);
                    setLoadedImages(prevImages => prevImages.filter((_, i) => i !== index));
                    setLoadingStates(prevStates => prevStates.filter((_, i) => i !== index));
                    loadMoreImages();
                  }
                }}
              />
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
