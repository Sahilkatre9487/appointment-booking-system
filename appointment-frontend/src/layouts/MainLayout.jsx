import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {

  return (
    <>

      <Navbar />

      <div
        style={{
          minHeight: "80vh"
        }}
      >
        <Outlet />
      </div>

      <Footer />

    </>
  );

}

export default MainLayout;