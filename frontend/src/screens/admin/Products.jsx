import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/AuthToken";
import baseURL from "../../baseurl";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const { currency, token,localBaseUrl } = useAuth();

  // Fetch product list
  const getProductList = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/product/list`);
      if (response.status === 200) {
        setProductList(response.data);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Unable to fetch product list. Please try again.");
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!userConfirmed) return; // Exit if user cancels
    try {
      const response = await axios.delete(`${baseURL}/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        // Update product list directly after deletion
        setProductList((prevList) => prevList.filter((product) => product._id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <p className="mb-2">All product list</p>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product list */}
        {productList.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          productList.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm"
            >
              <img
                src={`${localBaseUrl}${product.images?.[0]}`}
                alt={product.name || "Product"}
                className="w-16 h-16 object-cover rounded-md"
              />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>
                {currency}
                {product.price}
              </p>
              <button
                onClick={() => removeProduct(product._id)}
                className="text-right md:text-center cursor-pointer text-lg text-red-500"
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
