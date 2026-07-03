import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <div className="container mt-5">

      <div className="text-center mb-5">

        <h1>
          👋 Welcome
        </h1>

        <p className="text-muted">
          Manage your appointments easily from your dashboard.
        </p>

      </div>

      <div className="row">

        <div className="col-md-4 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h1>📅</h1>

              <h4>Book Appointment</h4>

              <p>
                Schedule a new appointment with a doctor.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/book")}
              >
                Book Now
              </button>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h1>📖</h1>

              <h4>My Appointments</h4>

              <p>
                View all your booked appointments.
              </p>

              <button
                className="btn btn-success"
                onClick={() => navigate("/my-appointments")}
              >
                View
              </button>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h1>🚪</h1>

              <h4>Logout</h4>

              <p>
                Securely logout from your account.
              </p>

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;