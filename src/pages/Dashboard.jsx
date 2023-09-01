import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className=" place-items-center h-screen w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default Dashboard;
