// import {
//   FavoriteBorderOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from "@material-ui/icons";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Search from "@mui/icons-material/Search";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: red;
//   position: absolute;
// `;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const ImageWrapper = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Desc = styled.div`
  background-color: white;
  color: black;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f5fbfd;
  padding: 10px;
`;
const DescTitle = styled.h3`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 700;
`;

const DescInfo = styled.span`
  font-size: 15px;
  margin-top: 10px;
  font-weight: 500;
`;

const DescPrice = styled.span`
  font-size: 15px;
  margin-top: 10px;
  font-weight: 500;
`;

//const Product = ( {props} ) => { befor that
const Product = ({ items }) => {
  console.log(items, "aaaaaaaa");
  return (
    <Container>
      <ImageWrapper>
        <Image src={items?.img[0]} />
        <Info>
          <Icon>
            <ShoppingCart />
          </Icon>
          <Icon>
            <Link to={`/ProductDetails/${items?._id}`}>
              <Search />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorder />
          </Icon>
        </Info>
      </ImageWrapper>

      <Desc>
        <DescTitle>{items?.title}</DescTitle>
        <DescInfo>{items?.desc}</DescInfo>
        <DescPrice>{items?.price[0]} LE</DescPrice>
      </Desc>
    </Container>
  );
};

export default Product;
