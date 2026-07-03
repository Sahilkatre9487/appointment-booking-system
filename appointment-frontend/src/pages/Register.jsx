import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message || "Registration Failed");
      } else {
        alert("Registration Failed");
      }

    }

  };

  return (

    <div className="container">

      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >

        <div className="col-md-6 col-lg-5">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <h2 className="fw-bold">
                  Create Account
                </h2>

                <p className="text-muted">
                  Register as a new user
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>

              </form>

              <div className="text-center mt-4">

                Already have an account?

                <Link
                  to="/login"
                  className="ms-2"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Register;