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
        navigate("/admin/appointments");
         } else {
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
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-5">
          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Appointment Booking Login
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

              <div className="mb-3">
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
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
// login