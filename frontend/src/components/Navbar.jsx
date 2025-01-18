import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthToken";
import { assets } from "../assets/frontend_assets/assets";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
    const { logout, user,getCartCount } = useAuth();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const isLoggedIn = user?.isLoggin || false;

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-800-500 font-bold hover:text-gray-950 flex flex-col items-center border-b-2 border-gray-800 w-[70%]"
            : "hover:text-gray-900";
    

    return (
        <nav className="bg-white">
            <div>
                <div className="container mx-auto flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-[#414141]">TrendHive</span>
                        </NavLink>
                    </div>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/collection" className={navLinkClass}>Collection</NavLink></li>
                        <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
                        <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
                    </ul>

                    <div className="flex items-center gap-6">
                        {isLoggedIn ? (
                            <div className="relative">
                                <img
                                    src={assets.profile_icon}
                                    alt="Profile"
                                    className="w-5 cursor-pointer"
                                    onClick={() => setDropdownVisible((prev) => !prev)}
                                />
                                {dropdownVisible && (
                                    <div className="absolute right-0 pt-3">
                                        <div className="flex flex-col gap-2 w-36 px-3 py-5 bg-gray-100 text-gray-600 rounded">
                                            <div onClick={()=>{navigate('/profile');setDropdownVisible((prev) => !prev)}} className="cursor-pointer hover:text-black">My Profile</div>
                                            <div onClick={()=>{navigate('/orders');setDropdownVisible((prev) => !prev)}} className="cursor-pointer hover:text-black">Orders</div>
                                            <div className="cursor-pointer hover:text-black">
                                                <button onClick={logout}>Logout</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => navigate("/login")}>
                                <img src={assets.profile_icon} alt="Login" className="w-5 cursor-pointer" />
                            </button>
                        )}
                        <Link to="/cart" className="relative">
                            <img src={assets.cart_icon} className="w-5 min-w-5 cursor-pointer" alt="Cart" />
                            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                               {getCartCount()}
                            </p>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="text-gray-600 focus:outline-none focus:text-blue-600 pt-2"
                                onClick={() => setVisible((prev) => !prev)}
                            >
                                {visible ? <IoClose className="text-4xl text-orange-600" /> : <IoMenu className="text-4xl text-gray-700" />}
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        visible ? "min-h-svh flex flex-col text-md w-full gap-y-6 mt-4 px-6" : "hidden"
                    } transition-all duration-300 ease-in-out`}
                >
                    <Link onClick={() => setVisible((prev) => !prev)} to="/" className="text-gray-600 hover:text-blue-600 border-b border-gray-300 pb-1">Home</Link>
                    <Link onClick={() => setVisible((prev) => !prev)} to="/collection" className="text-gray-600 hover:text-blue-600 border-b pb-1">Collection</Link>
                    <Link onClick={() => setVisible((prev) => !prev)} to="/about" className="text-gray-600 hover:text-blue-600 border-b pb-1">About</Link>
                    <Link onClick={() => setVisible((prev) => !prev)} to="/contact" className="text-gray-600 hover:text-blue-600 border-b pb-1">Contact</Link>
                    <div className="flex items justify-center mt-4 mb-10">
                        <button onClick={() => navigate("/signup")} className="px-4 py-2 bg-orange-600 text-white rounded-sm hover:bg-orange-700">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
