import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { assets } from "../../assets/admin_assets/assets";

// Reusable NavLink Component
// eslint-disable-next-line react/prop-types
const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 ${
          isActive
            ? "text-gray-800 font-bold hover:text-gray-950 border-b-2 border-gray-800"
            : "text-gray-800 hover:text-gray-900"
        }`
      }
    >
      {icon}
      <p className="hidden md:block">{label}</p>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className="w-[16%] min-h-screen border-r-2 py-5">
      <div className="flex flex-col gap-8 md:gap-4 pt-6 md:px-8 text-base">
        {/* Home Link */}
        <SidebarLink
          to="/"
          icon={<IoHomeOutline className="text-xl text-black" />}
          label="Home"
        />

        {/* Add Items Link */}
        <SidebarLink
          to="/admin/add"
          icon={<img src={assets.add_icon} className="w-5 h-5" alt="Add Icon" />}
          label="Add Items"
        />

        {/* List Items Link */}
        <SidebarLink
          to="/admin/products"
          icon={<img src={assets.order_icon} className="w-5 h-5" alt="Order Icon" />}
          label="List Items"
        />

        {/* Orders Link */}
        <SidebarLink
          to="/admin/orders"
          icon={<img src={assets.order_icon} className="w-5 h-5" alt="Order Icon" />}
          label="Orders"
        />
        <SidebarLink
          to="/admin/users"
          icon={<img src={assets.order_icon} className="w-5 h-5" alt="user Icon" />}
          label="users"
        />
      </div>
    </div>
  );
};

export default Sidebar;
