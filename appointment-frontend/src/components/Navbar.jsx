import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };

 return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

    <div className="container">

      {/* BRAND */}
      <Link className="navbar-brand fw-bold" to="/">
        EasyBook
      </Link>

      {/* MOBILE BUTTON */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

        {/* LEFT MENU */}
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

            {role === "PROVIDER" && (
  <li className="nav-item">
    <Link className="nav-link" to="/provider/dashboard">
      Provider Dashboard
    </Link>
  </li>
)}


          {token && role === "USER" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/book">
                  Book Service
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/my-appointments">
                  My Bookings
                </Link>
              </li>
            </>
          )}

          {token && role === "ADMIN" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Admin Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/appointments">
                  Manage Appointments
                </Link>
              </li>
            </>
          )}

        </ul>

        {/* RIGHT MENU */}
        <ul className="navbar-nav">

          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-primary ms-2" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}

        </ul>

      </div>

    </div>

  </nav>
);
}

export default Navbar;