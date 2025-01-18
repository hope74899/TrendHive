import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
// import { useAuth } from "../../Store/AuthToken";

const Dashboard = () => {
       // const { admin } = useAuth();
    // if (!admin) {
    //     return <Navigate to="*" />

    // }
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 border-gray-300 bg-white">
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
};

export default Dashboard;

