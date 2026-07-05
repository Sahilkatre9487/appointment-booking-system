import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllServices } from "../services/appointmentService";
import ServiceCard from "../components/ServiceCard";

function Home() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">

          <h1 className="display-3 fw-bold">
            EasyBook
          </h1>

          <p className="lead mt-3">
            Book appointments for Doctors, Consultancy, Training Institutes,
            Driving Schools and more — all in one platform.
          </p>

          <div className="mt-4">

    <Link
        to="/register"
        className="btn btn-light btn-lg me-3"
    >
        Register as Customer
    </Link>

    <Link
        to="/provider-register"
        className="btn btn-warning btn-lg me-3"
    >
        Become a Provider
    </Link>

    <Link
        to="/login"
        className="btn btn-outline-light btn-lg"
    >
        Login
    </Link>

</div>

        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="container my-5">

        <h2 className="text-center mb-5 fw-bold">
          Our Services
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <div className="row">

            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}

          </div>
        )}

      </div>

      {/* Provider Section */}

<div className="container my-5">

    <div className="row align-items-center">

        <div className="col-md-6">

            <h2 className="fw-bold">
                Grow Your Business with EasyBook
            </h2>

            <p className="lead mt-3">

                Join EasyBook as a verified service provider and
                receive online bookings from customers searching
                for trusted professionals.

            </p>

            <ul className="list-group list-group-flush">

                <li className="list-group-item">
                    ✓ Accept appointments online
                </li>

                <li className="list-group-item">
                    ✓ Manage your own schedule
                </li>

                <li className="list-group-item">
                    ✓ Increase your business visibility
                </li>

                <li className="list-group-item">
                    ✓ Secure customer management
                </li>

            </ul>

            <Link
                to="/provider-register"
                className="btn btn-primary mt-4"
            >
                Register Your Business
            </Link>

        </div>

        <div className="col-md-6 text-center">

            <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800"
                className="img-fluid rounded shadow"
                alt="Provider"
            />

        </div>

    </div>

</div>

      {/* FEATURES */}
      <div className="container my-5">

        <h2 className="text-center mb-5">
          Why EasyBook?
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <i className="bi bi-calendar-check display-4 text-primary"></i>
              <h4 className="mt-3">Easy Booking</h4>
              <p>Book any service in just a few clicks.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <i className="bi bi-shield-lock display-4 text-success"></i>
              <h4 className="mt-3">Secure System</h4>
              <p>JWT authentication ensures safety.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4 h-100">
              <i className="bi bi-clock-history display-4 text-warning"></i>
              <h4 className="mt-3">Real-time Tracking</h4>
              <p>Track appointment status instantly.</p>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 mt-5">

        <h5>EasyBook</h5>

        <p className="mb-1">
          Java • Spring Boot • React • MySQL
        </p>

        <small>
          © 2026 EasyBook. All Rights Reserved.
        </small>

      </footer>

    </>
  );
}

export default Home;