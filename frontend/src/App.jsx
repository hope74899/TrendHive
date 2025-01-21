import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useTokenExpiration from "./auth/useTokenExpiration ";
import ProtectedRoute from "./ProtectedRoute";
import StripeVerify from "./screens/shop/StripeVerify";


//User related imports
const Login = lazy(() => import("./screens/signup/Login"));
const Signup = lazy(() => import("./screens/signup/Signup"));
const OTP = lazy(() => import("./screens/signup/OTP"));
const ForgotPassword = lazy(() => import("./screens/signup/ForgetPassword"));
const UpdatePassword = lazy(() => import("./screens/signup/UpdatePassword"));
const GoogleLoginHandler = lazy(() => import("./screens/signup/GoogleLoginHandler"));
const Profile = lazy(() => import("./screens/Profile"));

//shop related imports
const Home = lazy(() => import("./screens/shop/Home"));
const Collection = lazy(() => import("./screens/shop/Collection"));
const About = lazy(() => import("./screens/shop/About"));
const Contact = lazy(() => import("./screens/shop/Contact"));
const Product = lazy(() => import("./screens/shop/Product"));
const Cart = lazy(() => import("./screens/shop/Cart"));
const PlaceOrder = lazy(() => import("./screens/shop/PlaceOrder"));
const Orders = lazy(() => import("./screens/shop/Orders"));

//admin related imports
const Dashboard = lazy(() => import("./screens/admin/Dashborad"));
const Products = lazy(() => import("./screens/admin/Products"));;
const AddProduct = lazy(() => import("./screens/admin/AddProduct"));;
const AdminOrders = lazy(() => import("./screens/admin/AdminOrders"));
const User = lazy(() => import("./screens/admin/User"));

// Loading fallback
const Loading = () => <div>Loading...</div>;

// Layout Component for Routes with Navbar and Footer
const LayoutWithNavbarAndFooter = () => {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

function App() {
  useTokenExpiration();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<LayoutWithNavbarAndFooter />}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/verify" element={<StripeVerify />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Routes without Navbar and Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/google-login" element={<GoogleLoginHandler />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<User />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
