import { useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Title from "../../components/shop/Title";
import { useAuth } from "../../auth/AuthToken";
import ProductItem from "../../components/shop/ProductItem";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products } = useAuth(); // Assuming `products` contains all available products.
  const [filterproducts, setFilterproducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("relavent"); // Tracks the selected sort option.
  const [search, setSearch] = useState(""); // Tracks the search query.
  const [visible, setVisible] = useState(false); // Toggles the search input visibility.

  // Filter, search, and sort products whenever any dependency changes.
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = category.length === 0 || category.includes(product.category);
      const matchesSubCategory = subCategory.length === 0 || subCategory.includes(product.subCategory);
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
    });

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      if (sort === "low-high") return a.price - b.price; // Ascending order
      if (sort === "high-low") return b.price - a.price; // Descending order
      return 0; // Default case for "relavent"
    });

    setFilterproducts(filtered);
  }, [category, subCategory, sort, search, products]);

  // Handles category filter changes.
  const handleCategoryChange = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Handles subcategory filter changes.
  const handleSubCategoryChange = (value) => {
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Handles search input changes.
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClose = () => {
    setVisible(false);
    setSearch("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* Filters Section */}
      <div className="sm:w-1/5">
        {/* Mobile Filter Toggle */}
        <div className="flex justify-between items-center">
          <p
            onClick={() => setShowFilter((prev) => !prev)}
            className="text-lg font-medium cursor-pointer flex items-center gap-2"
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              alt="Toggle Filters"
              className={`h-4 ${showFilter ? "rotate-90" : " "}`}
            />
          </p>
        </div>

        {/* Filters (always visible on large screens) */}
        <div className={`${showFilter ? "" : "hidden sm:block"} border border-gray-300 p-4 rounded-md`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={cat}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <p className="mt-6 mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
              <label key={subCat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  value={subCat}
                  onChange={() => handleSubCategoryChange(subCat)}
                />
                {subCat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Search and Sort */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Search */}
            <div className="relative flex items-center">
              {visible && (
                <input
                  type="text"
                  placeholder="Search Products"
                  className="w-36 sm:w-60 mr-1 sm:mr-2 px-2 sm:px-4 py-1 sm:py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={handleSearchChange}
                />
              )}
              <img
                onClick={visible ? handleSearchClose : () => setVisible(true)}
                src={visible ? assets.cross_icon : assets.search_icon}
                className="w-6 mr-2 cursor-pointer"
                alt="Toggle Search"
              />
            </div>

            {/* Sorting */}
            <select
              className="border-2 border-gray-300 text-sm  px-2 py-1 rounded-md"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        {/* Render Filtered, Searched, and Sorted Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterproducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
