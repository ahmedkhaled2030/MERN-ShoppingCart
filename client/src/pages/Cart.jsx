import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import {
  addProduct,
  removeProduct,
  removeBulk,
  addCart,
  removeCart,
} from "../redux/cartRedux";
import { Link } from "react-router-dom";

// import { useHistory } from "react-router";
// import StripeCheckout from "react-stripe-checkout";
// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;
const NoText = styled.h1`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: red;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  margin: 20px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  ${mobile({ flexDirection: "column" })};
  position: relative;
`;
const RemoveProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: -10px;
  right: -15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: space-between;
  margin-bottom: 20px;
  border: 1px solid gray;
  padding: 5px 10px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 40vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();

  const handleRemoveBulk = (id, amount, color, size) => {
    console.log(id, amount);
    dispatch(removeBulk({ id, amount, color, size }));
  };

  const handleQuantity = (id, price, quantity, type, color, size) => {
    if (type === "dec") {
      quantity > 1 && dispatch(removeCart({ id, price, color, size }));
    } else {
      dispatch(addCart({ id, price, color, size }));
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>

          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <Link to="/checkout">
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {cart.products.length == 0 && (
              <NoText>There is no any product in your cart !</NoText>
            )}
            {cart.products.map((product) => (
              <Product key={product.createdAt + product.size + product.color}>
                <RemoveProduct
                  onClick={() =>
                    handleRemoveBulk(
                      product._id,
                      product.price * product.quantity,
                      product.color,
                      product.size
                    )
                  }
                >
                  X
                </RemoveProduct>
                <ProductDetail>
                  <Image src={product.img[0]} />
                  <Details>
                    <ProductName>
                      <b>ProductTitle :</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID :</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size :</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleQuantity(
                          product._id,
                          product.price,
                          product.quantity,
                          "dec",
                          product.color,
                          product.size
                        )
                      }
                    />

                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleQuantity(
                          product._id,
                          product.price,
                          product.quantity,
                          "inc",
                          product.color,
                          product.size
                        )
                      }
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    {product.price * product.quantity} EGP
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            {/* <Hr /> */}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice> {cart.total} EGP</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>{cart.total > 0 ? 60 : 0} EGP</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                {cart.total > 0 ? -20 : 0} EGP
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                {cart.total > 0 ? cart.total + 40 : 0} EGP
              </SummaryItemPrice>
            </SummaryItem>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
