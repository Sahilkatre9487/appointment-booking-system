function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">

      <div className="container">

        <div className="row">

          <div className="col-md-6">
            <h4>🏥 Appointment Booking</h4>

            <p>
              Book appointments online with ease.
            </p>
          </div>

          <div className="col-md-3">

            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>Home</li>
              <li>Login</li>
              <li>Register</li>

            </ul>

          </div>

          <div className="col-md-3">

            <h5>Contact</h5>

            <p>Email</p>

            <p>support@appointment.com</p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          © 2026 Appointment Booking System

          <br />

          Developed by <strong>Sahil Katre</strong>

        </div>

      </div>

    </footer>
  );
}

export default Footer;