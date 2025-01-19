import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../baseurl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user details
    const [products, setProduct] = useState([]);
    const [token, setToken] = useState(() => localStorage.getItem("token")); // Retrieve token from localStorage
    const navigate = useNavigate();
    // Helper function to store token
    const storeToken = (data) => {
        const serverToken = data.token;
        const tokenExpiry = data.tokenExpiry;
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
        localStorage.setItem("tokenExpiry", tokenExpiry);
        localStorage.setItem("lastActivity", Date.now().toString());
    };

    // Helper function to clear user session
    const clearSession = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("lastActivity");
    };

    // Function to verify and fetch the current user
    const verifyToken = async (serverToken) => {
        try {
            const response = await axios.post(
                `${baseURL}/api/user/current`,
                {}, // Empty body
                {
                    headers: {
                        Authorization: `Bearer ${serverToken}`, // Attach token as Bearer token
                    },
                }
            );

            // Store user data if verification succeeds
            setUser(response.data.user);
            // console.log(response.data.user);

        } catch (err) {
            console.error("Token verification failed:", err.response?.data || err.message);
            clearSession(); // Clear session on error
        }
    };

    // Effect to verify token whenever it changes
    useEffect(() => {
        if (token) {
            verifyToken(token);

        } else {
            clearSession(); // Clear session if no token
        }
    }, [token]);

    // Function to handle logout
    const logout = async () => {
        try {
            if (!user || !user._id) {
                console.error("No user found to log out.");
                clearSession();
                navigate('/'); // Redirect to login page
                return;
            }

            // Call the logout API
            const response = await axios.post(`${baseURL}/api/logout/${user._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
                withCredentials: true
            });

            if (response.status === 200) {
                // console.log(response.data.message);
                toast.success(response.data.message)
            } else {
                console.warn("Unexpected logout response:", response);
            }
        } catch (err) {
            console.error("Logout API error:", err.response?.data || err.message);
        } finally {
            document.cookie = "token=; Max-Age=0; path=/";
            clearSession();
            navigate('/');
        }
    };

    const currency = '$';
    const delivery_fee = 10;
    const [cartItems, setCartItems] = useState({})
    // Determine base URL for images
    const localBaseUrl = baseURL === 'http://localhost:8000'
        ? 'http://localhost:8000/public/'  // Development URL
        : `${baseURL}/`;  // Production URL on cPanel

    const isLoggin = user?.isLoggin;
    const userId = user?._id;

    const getUserCart = async () => {
        if (!isLoggin || !userId) {
            console.warn("User is not logged in or userId is missing.");
            return;
        }

        try {
            const response = await axios.get(`${baseURL}/api/cart/get`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setCartItems(response.data.cartData || {}); // Ensure cartData is always an object
                // toast.success("Cart data loaded successfully.");
            } else {
                toast.error(response.data.message || "Failed to load cart data.");
            }
        } catch (error) {
            console.error("Error fetching cart data:", error?.response?.data || error.message);
            toast.error("Unable to load cart data. Please try again.");
        }
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/product/list`);
            if (response.status === 200) {
                setProduct(response.data);
            } else {
                toast.error("Failed to fetch products.");
            }
        } catch (error) {
            console.error("Error fetching product list:", error);
            toast.error("Unable to fetch product list. Please try again.");
        }
    };

    useEffect(() => {
        if (token) {
            getProductsData(); // Fetch product data when token is available

            if (userId) {
                getUserCart(); // Fetch user cart when both token and userId are available
            }
        }
    }, [token, userId]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select a product size!");
            return;
        }

        // Update frontend state
        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart };
            if (!updatedCart[itemId]) updatedCart[itemId] = {};
            updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
            return updatedCart;
        });

        // Synchronize with the backend
        if (isLoggin) {
            try {
                const response = await axios.post(`${baseURL}/api/cart/add`, {
                    userId,
                    itemId,
                    size,
                });

                if (response.status === 201) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error adding to cart:", error?.response?.data || error.message);
                toast.error("Failed to add item to the cart.");
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;

        // Loop through all products in the cart
        for (const productId in cartItems) {
            const sizes = cartItems[productId];
            // console.log("size", sizes);

            // Loop through all sizes for a product
            for (const size in sizes) {
                // console.log("size", sizes[size]);
                totalCount += sizes[size]; // Add the quantity of each size to the total count
            }
        }

        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        if (quantity !== 1 && quantity !== -1) return; // Avoid invalid quantities
    
        let updatedCartState = null; // To track the updated cart state
        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart };
    
            if (updatedCart[itemId]) {
                // Calculate the new quantity
                const currentQuantity = updatedCart[itemId][size] || 1;
                const newQuantity = currentQuantity + quantity;
    
                // Check if the quantity would drop below 1
                if (newQuantity < 1) {
                    toast.info("At least 1 item is necessary.");
                    return prevCart; // Don't update the cart state
                }
    
                // Update the cart with the new quantity
                updatedCart[itemId][size] = newQuantity;
                updatedCartState = updatedCart; // Save updated state for request
            }
    
            return updatedCart;
        });
    
        // Ensure the backend request is only sent if the quantity is valid
        if (isLoggin && updatedCartState) {
            try {
                const currentQuantity = updatedCartState[itemId][size];
                if (currentQuantity >= 1) { // Only make the request if quantity is valid
                    const response = await axios.put(`${baseURL}/api/cart/update`, {
                        userId,
                        itemId,
                        size,
                        quantity,
                    });
    
                    if (response.status === 201) {
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
                }
            } catch (error) {
                console.error("Error updating cart:", error?.response?.data || error.message);
                toast.error("Failed to update item quantity.");
            }
        }
    };
    

    const deleteItem = async (itemId, size) => { // Added userId
        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart };

            if (updatedCart[itemId]) {
                delete updatedCart[itemId][size];
                if (Object.keys(updatedCart[itemId]).length === 0) {
                    delete updatedCart[itemId];
                }
            }
            return updatedCart
        });
        if (isLoggin){
        try {
            // Check for required parameters
            if (!userId || !itemId || !size) return;
            
            // API request
            const response = await axios.delete(`${baseURL}/api/cart/delete`, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                data: { userId, itemId, size }, // Correctly pass data
            });
            
        
            // Handle response
            if (response.status === 200) {
                console.log(response);
                
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // Handle error
            console.error("Error while deleting item from cart:", error?.response?.data || error.message);
            toast.error("Failed to delete item from cart.");
        }
    }
        
    };

    const getCartAmount = () => {
        let totalAmount = 0; // Initialize total amount

        for (const itemId in cartItems) {
            // Find product details using the product ID
            const itemInfo = products.find((product) => product._id === itemId);

            // Ensure the product exists to avoid errors
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    const quantity = cartItems[itemId][size];
                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity; // Calculate total for this product size
                    }
                }
            }
        }
        return totalAmount; // Return the total amount
    };


    return (
        <AuthContext.Provider
            value={{
                setUser,
                storeToken,
                logout,
                addToCart,
                getCartCount,
                updateQuantity,
                deleteItem,
                getCartAmount,
                setCartItems,
                getProductsData,
                user,
                token,
                currency,
                delivery_fee,
                products,
                cartItems,
                localBaseUrl
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
