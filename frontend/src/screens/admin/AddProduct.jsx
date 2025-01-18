import axios from "axios";
import { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import { useAuth } from "../../auth/AuthToken";
import { toast } from "react-toastify";
import baseURL from "../../baseurl";

const AddProduct = () => {
  const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const { token } = useAuth();

  // Event Handlers
  const handleImageChange = (e) => {
    const { id, files } = e.target;
    setImages((prev) => ({
      ...prev,
      [id]: files[0],
    }));
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetForm = () => {
    setImages({ image1: null, image2: null, image3: null, image4: null });
    setProductName('');
    setDescription('');
    setCategory('');
    setSubCategory('');
    setPrice('');
    setSizes([]);
    setBestSeller(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append files
      Object.entries(images).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Append other data
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestSeller', bestSeller);

      // Send POST request
      const response = await axios.post(
        `${baseURL}/api/product/add`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Get token from local storage
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );
      if(response.status===201){
        toast.success(response.data.message)
        resetForm();
      }
      else{
        toast.error(response.data.message || 'Error while adding product')
      }
    } catch (error) {
      // Handle errors
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-start gap-3">
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            {['image1', 'image2', 'image3', 'image4'].map((imageKey) => (
              <label key={imageKey} htmlFor={imageKey}>
                <img
                  className="w-20 cursor-pointer"
                  src={images[imageKey] ? URL.createObjectURL(images[imageKey]) : assets.upload_area}
                  alt=""
                />
                <input type="file" id={imageKey} hidden onChange={handleImageChange} />
              </label>
            ))}
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            required
            placeholder="Type here"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2"
            required
            placeholder="Write content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              className="w-full px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub Category</p>
            <select
              className="w-full px-3 py-2"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              className="w-full sm:w-[120px] px-3 py-2"
              type="number"
              required
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <p
                key={size}
                className={`px-3 py-1 cursor-pointer ${sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-slate-200'
                  }`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to Bestseller
          </label>
        </div>
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
