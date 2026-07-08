import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("===== NEW LOGIN PAGE =====");

    try {
      const response = await login({
        email,
        password,
      });

      console.log(response.data);
      console.log("Role from backend:", response.data.role);

      localStorage.setItem("token", response.data.token);
         localStorage.setItem("role", response.data.role);

         console.log("Saved role:", response.data.role);
console.log("Role in localStorage:", localStorage.getItem("role"));

        if (response.data.role === "ADMIN") {

    navigate("/admin/dashboard");

}
else if (response.data.role === "PROVIDER") {

    navigate("/provider/dashboard");

}
else {

    navigate("/my-appointments");

}

        alert("Login Successful");

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Invalid Credentials");
    }
  };

  return (
  <div className="container-fluid">

    <div className="row" style={{ minHeight: "90vh" }}>

      {/* Left Side */}

      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white"
      >

        <h1 className="display-4 fw-bold">
          🏥 Appointment Booking
        </h1>

        <p className="lead mt-3 text-center px-5">

          Book appointments with doctors anytime,
          anywhere through our secure online platform.

        </p>

      </div>

      {/* Right Side */}

      <div
        className="col-md-6 d-flex justify-content-center align-items-center"
      >

        <div
          className="card shadow-lg border-0 p-5"
          style={{ width: "420px" }}
        >

          <h2 className="text-center mb-4">

            Login

          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="mb-4">

              <label>Password</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            <button
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-3">

            Don't have an account?

            <a
              href="/register"
              className="ms-2"
            >
              Register
            </a>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;
// login