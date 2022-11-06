import "./Sidebar.css";
import LineStyle from "@mui/icons-material/LineStyle";
import Timeline from "@mui/icons-material/Timeline";
import TrendingUp from "@mui/icons-material/TrendingUp";
import PermIdentity from "@mui/icons-material/PermIdentity";
import Storefront from "@mui/icons-material/Storefront";
import AttachMoney from "@mui/icons-material/AttachMoney";
import BarChart from "@mui/icons-material/BarChart";
import MailOutline from "@mui/icons-material/MailOutline";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import WorkOutline from "@mui/icons-material/WorkOutline";
import Report from "@mui/icons-material/Report";
import SupervisedUserCircle from "@mui/icons-material/SupervisedUserCircle";
import LocalMall from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link className="link" to="/">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Orders
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Transactions
            </li> */}
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Users</h3>
          <ul className="sidebarList">
            <Link className="link" to="/users">
              <li className="sidebarListItem">
                <SupervisedUserCircle className="sidebarIcon" />
                Users List
              </li>
            </Link>
            <Link className="link" to="/newUser">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add User
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Products</h3>
          <ul className="sidebarList">
            <Link className="link" to="/products">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                ProductsList
              </li>
            </Link>
            <Link className="link" to="/newProduct">
            <li className="sidebarListItem">
              <LocalMall className="sidebarIcon" />
              AddProduct
              </li>
              </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Orders</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li> */}
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Orders List
            </li>
            {/* <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
