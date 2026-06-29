import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/appointmentService";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card bg-primary text-white p-3">
            <h5>Total Appointments</h5>
            <h2>{stats.totalAppointments}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white p-3">
            <h5>Approved</h5>
            <h2>{stats.approvedAppointments}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark p-3">
            <h5>Pending</h5>
            <h2>{stats.pendingAppointments}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white p-3">
            <h5>Cancelled</h5>
            <h2>{stats.cancelledAppointments}</h2>
          </div>
        </div>

      </div>
        <button
  className="btn btn-danger float-end"
  onClick={handleLogout}
     >
         Logout
         </button>
    </div>
    
  );
}

export default Dashboard;