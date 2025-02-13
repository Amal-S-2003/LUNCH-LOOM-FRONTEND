import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserHome from "./pages/UserHome";
import Cart from "./pages/Cart";
import Foods from "./pages/Foods";
import UserProfile from "./pages/UserProfile";
import MessMenu from "./pages/MessMenu";
import MessDetails from "./pages/MessDetails";
import OrderPage from "./pages/OrderPage";
import MessOwnerHome from "./pages/MessOwnerHome";
import MessDahboard from "./pages/MessDahboard";
import MessProfile from "./pages/MessProfile";
import CustomerListing from "./pages/CustomerListing";
import MenuAdd from "./pages/MenuAdd";
import DisplayMenu from "./pages/DiaplayMenu";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashBoard";
import ViewUsers from "./pages/ViewUsers";
import ViewMessOwners from "./pages/ViewMessOwners";
import ViewFoodItems from "./pages/ViewFoodItems";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MessRegistration from "./pages/MessRegistration";
import MessLoginForm from "./pages/MessLoginForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import ViewOrders from "./pages/ViewOrders";
import OrderList from "./pages/OrderList";
import { useContext } from "react";
import { TokenAuthContext } from "./context/TokenAuth";
import CancelPage from "./pages/CancelPage";
import { UserContext } from "./context/UserContext";
import AdminLogin from "./pages/AdminLogin";
import HistoryPage from "./pages/HistoryPage";
import MapSmaple from "./pages/MapSmaple";
import MapComponent from "./pages/MapSmaple";
import SubscriptionDetailsPage from "./pages/SubscriptionDetailsPage";
import Requests from "./pages/Requests";

function App() {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  const { userLogged,setUserLogged} = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserHome />}>
          <Route path="" element={<MessMenu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="foods" element={<Foods />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="mess-details/:id" element={<MessDetails />} />
          <Route path="myOrders" element={<ViewOrders />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="/subDetails/:id" element={<SubscriptionDetailsPage />} />

        </Route>
        <Route path="/mess-owner" element={<MessOwnerHome />}>
          <Route path="" element={<MessDahboard />} />
          <Route path="dashboard" element={<MessDahboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="edit-menu" element={<MenuAdd />} />
          <Route path="view-menu" element={<DisplayMenu />} />
          <Route path="customers" element={<CustomerListing />} />
          <Route path="mess-profile" element={<MessProfile />} />
        </Route>
        <Route path="/admin-home" element={<AdminHome />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ViewUsers />} />
          <Route path="mess" element={<ViewMessOwners />} />
          <Route path="fooditems" element={<ViewFoodItems />} />
          <Route path="view-all-orders" element={<OrderList />} />
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/mess-registration" element={<MessRegistration />} />
        <Route path="/mess-login" element={<MessLoginForm />} />
        <Route path="/verify" element={<PaymentSuccess />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/map" element={<MapSmaple />} />
        {/* <Route path="/myOrders" element={<ViewOrders />} /> */}

          <Route path="/" element={<MapComponent />} />

          {/* Map with specific coordinates */}
          <Route path="/map/:lat/:lon" element={<MapComponent />} />
        
      </Routes>
    </div>
  );
}

export default App;
