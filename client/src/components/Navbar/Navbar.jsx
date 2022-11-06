import { Search, Close } from "@mui/icons-material";

import ShoppingCart from "@mui/icons-material/ShoppingCart";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";

import { signOut } from "./../../redux/userRedux.js";
import axios from "axios";

const Container = styled.div`
  height: 70px;
  ${mobile({ height: "50px" })};
  background-color: black;
  color: White;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  padding: 5px 20px;
  width: 500px;
  background-color: black;
  margin-right: 20px;
  &:hover {
    border: 2px solid #fff;
  }
`;
const SearchInput = styled.input`
  background-color: black;
  border: none;
  width: 100%;
  font-size: 20px;
  outline: none;
  color: white;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products/search?q=${query}`
      );
      console.log(res.data);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state?.user?.currentUser?.username);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(user);

  const signOut = () => {
    localStorage.removeItem("persist:root");
    window.location.reload(false);
  };
  const handleSearch = () => {
    setIsShown((current) => !current);
  };

  return (
    <Container>
      {isShown && (
        <SearchWrapper>
          <SearchContainer>
            <SearchInput
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search onClick={handleSearch} />
          </SearchContainer>
          <Close
            style={{ color: "white", fontSize: 25, cursor: "pointer" }}
            onClick={() => setIsShown((current) => !current)}
          />
        </SearchWrapper>
      )}

      {!isShown && (
        <Wrapper>
          <Left>
            <Language>EN</Language>

            <Search
              style={{ color: "white", fontSize: 25, cursor: "pointer" }}
              onClick={handleSearch}
            />
          </Left>
          <Center>
            <Link to="/" className="linkItem">
              <Logo>Home</Logo>
            </Link>
          </Center>

          <Right>
            {!user && (
              <Link to="/login" className="linkItem">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            )}

            {!user && (
              <Link to="/register" className="linkItem">
                <MenuItem>REGISTER</MenuItem>
              </Link>
            )}

            {user ? (
              <Link to="/register" className="linkItem">
                <MenuItem>Hello , {status}</MenuItem>
              </Link>
            ) : null}

            {user && (
              <Link to="/register" className="linkItem">
                <MenuItem onClick={signOut}>SignOut</MenuItem>
              </Link>
            )}

            <Link to="/cart">
              <MenuItem>
                <Badge
                  badgeContent={quantity}
                  color="primary"
                  className="linkItem"
                >
                  <ShoppingCart className="linkItem" />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      )}
    </Container>
  );
};

export default Navbar;
