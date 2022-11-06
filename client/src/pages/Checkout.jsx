import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useState } from "react";
import Navbar from "./../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { addOrder } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;
const Heading = styled.h2`
  margin-bottom: 20px;
`;

const SubHeading = styled.span`
  margin: 20px 0px;
  color: grey;
  font-weight: 500;
`;

const GoveAndPhone = styled.div`
  display: flex;
`;

const Right = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 40px;
  border-left: 1px solid grey;
`;
const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const Title = styled.span`
  font-size: 20px;
`;
const Specs = styled.span``;
const Amount = styled.span`
  font-size: 20px;
  font-weight: 700;
`;
const Qunatity = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #737373;
  position: absolute;
  top: -5px;
  right: -5px;

  font-size: 14px;
  font-weight: 600;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`;

const AmountInfo = styled.div`
  padding: 20px;
`;
const Subtotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 20px;
`;
const Shipping = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 20px;
`;
const Total = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 30px;
`;

export const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user)
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [products, setProducts] = useState([]);
  const [governorate, setGovernorate] = useState("");

  const handleGovernorate = (e) => {
    setGovernorate(e.target.value);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const order = { user, ...inputs, cart, products: [...cart.products] };
    console.log(order, "order");
    addOrder(order, dispatch);
  };

  return (
    <div>
      <Container>
        <Left>
          <Heading>Market Store</Heading>
          <SubHeading>Contact information</SubHeading>

          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            style={{ width: "600px" }}
            onChange={handleChange}
          />
          <SubHeading>Shipping address</SubHeading>
          <TextField
            id="outlined-basic"
            label="Name"
            name="name"
            variant="outlined"
            style={{ width: "600px", marginBottom: "10px" }}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="address"
            name="address"
            variant="outlined"
            style={{ width: "600px", marginBottom: "10px" }}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="Apartment, suite, inc."
            name="apartment"
            variant="outlined"
            style={{ width: "600px", marginBottom: "10px" }}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="City"
            name="city"
            variant="outlined"
            style={{ width: "600px", marginBottom: "10px" }}
            onChange={handleChange}
          />

          <GoveAndPhone>
            <FormControl sx={{ minWidth: 170 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Governorate
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={governorate}
                name="governorate"
                label="Governorate"
                onChange={(e) => {
                  handleChange(e);
                  handleGovernorate(e);
                }}
              >
                <MenuItem value={"Cairo"}>Cairo</MenuItem>
                <MenuItem value={"Alexandria"}>Alexandria</MenuItem>
                <MenuItem value={"Giza"}>Giza</MenuItem>
                <MenuItem value={"Qalyubia"}>Qalyubia</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Phone"
              name="phone"
              variant="outlined"
              onChange={handleChange}
              style={{ width: "420px", marginLeft: "10px" }}
            />
          </GoveAndPhone>
          <Button
            variant="contained"
            color="success"
            style={{
              width: "200px",
              marginTop: "30px",
              padding: "20px 10px",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleClick}
          >
            Make Order
          </Button>
        </Left>
        <Right>
          {cart.products.map((item) => (
            <Product key={item.createdAt + item.size + item.color}>
              <ProductInfo>
                <ImageWrapper>
                  <ProductImage src={item.img[0]} />
                  <Qunatity>{item.quantity}</Qunatity>
                </ImageWrapper>
                <InfoWrapper>
                  <Title>{item.title}</Title>
                  <Specs>
                    {item.size} cm / {item.color}
                  </Specs>
                </InfoWrapper>
              </ProductInfo>
              <Amount>{item.price * item.quantity} EGP </Amount>
            </Product>
          ))}
          <Hr />
          <AmountInfo>
            <Subtotal>
              <span>Subtotal</span>
              <span>{cart.total} EGP</span>
            </Subtotal>
            <Shipping>
              <span>Estimated Shipping</span>
              <span>60 EGP</span>
            </Shipping>
            <Shipping>
              <span>Shipping Discount</span>
              <span>-20 EGP</span>
            </Shipping>

            <Shipping>
              <span style={{ color: "green", fontWeight: "700" }}>
                PaymentMethod
              </span>
              <span style={{ color: "green", fontWeight: "700" }}>
                Cash On Delivery
              </span>
            </Shipping>
          </AmountInfo>

          <Hr />
          <Total>
            <span>Total</span>
            <span>{cart.total + 40} EGP</span>
          </Total>
        </Right>
      </Container>
    </div>
  );
};
