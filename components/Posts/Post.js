import PropTypes from 'prop-types';
import React, { useRef,useState,useEffect } from 'react';
import styled from '@emotion/styled';
import useUserData from '../useUserData/useUserData';
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
  bottom: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  top:43%;
  left: 3%;
`;

const NextButton = styled(Button)`
  right: 3%;
  top:43%;
`;
const Content1 = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '10px',
  },
}));
const Heading1=styled.div(()=>({
  display: 'flex',
  flexDirection: 'row'
}));
const Data1=styled.div(()=>({
  display: 'flex',
  flexDirection: 'column',
  margin:'2%'
}));
const Icon1=styled.div(()=>({
  display: 'flex',
  justifyContent:'centre',
  alignItems:'centre',
  left:'2px',
  width:'25%',
  backgroundColor:'grey',
  padding:'0',
  borderRadius:'50%',
  width:'60px',
  height:'60px',
  color:'white',
  margin:'5px'

}));
const Name=styled.div(()=>({
  display: 'flex',
  marginTop:'5px',
  fontWeight:'bolder'
}));
const Email=styled.div(()=>({
  display: 'flex',
}));


const Post = ({ post ,index}) => {
  const carouselRef = useRef(null);
  // const {users}=useUserData();
  const { users, isLoading } = useUserData();
  const [userData, setUserData] = useState(null);
console.log(userData);
useEffect(() => {
  const adjIndex = index % 10;
  if (users && users.length > 0) {
    setUserData(users[adjIndex]);
  }
}, [users, index]);

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
  if (isLoading || !userData) {
    return <div>Loading.....</div>;
  }
  return (
    <>
    <PostContainer>
          <Heading1>
            <Icon1 > 
               <span style={{padding:'2px',fontSize:'25px',marginLeft:'10px',marginTop:'9px',fontWeight:'Bold'}}>{userData.name.charAt(0)}</span>
              <span style={{padding:'2px',fontSize:'25px',marginTop:'9px',marginRight:'8px',fontWeight:'Bold'}}>{userData.name.split(' ')[1]?.charAt(0) || ''}</span>
            </Icon1>
            <Data1>
              <Name >{userData.name}</Name>
              <Email>{userData.email}</Email>
            </Data1>
          </Heading1>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image,i) => (
            <CarouselItem key={i} >
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton style={{color:"black"}}onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton style={{color:"black"}} onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
     </>
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