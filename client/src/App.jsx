import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Checkout } from './pages/Checkout';

import 'swiper/swiper.min.css';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ProductSlider from "./components/ProductSlider/ProductSlider";
import SearchFilter from "./pages/SearchFilter";

const App = () => { 
  const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/ProductDetails/:id">
          <ProductDetails />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/ProductSlider">
          <ProductSlider />
        </Route>
        <Route path="/SearchFilter">
          <SearchFilter />
        </Route>
     
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
