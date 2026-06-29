import { useEffect, useState } from "react";
import {
  getAllServices,
  bookAppointment
} from "../services/appointmentService";

function BookAppointment() {

  const [services, setServices] = useState([]);

  const [appointment, setAppointment] = useState({
    serviceId: "",
    appointmentDate: "",
    appointmentTime: ""
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await bookAppointment({
        ...appointment,
        userId: 2 // temporary
      });

      alert("Appointment Booked Successfully");
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Service</label>

          <select
            className="form-control"
            name="serviceId"
            onChange={handleChange}
          >
            <option value="">
              Select Service
            </option>

            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
              >
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Date</label>

          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Time</label>

          <input
            type="time"
            className="form-control"
            name="appointmentTime"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">
          Book Appointment
        </button>

      </form>

    </div>
  );
}

export default BookAppointment;