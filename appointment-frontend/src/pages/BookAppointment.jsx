import { useEffect, useState } from "react";
import axios from "axios";
import {
  getAllServices,
  bookAppointment
} from "../services/appointmentService";

function BookAppointment() {

  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);

  const [appointment, setAppointment] = useState({
    serviceId: "",
    providerId: "",
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

  const loadProviders = async (serviceId) => {

    if (!serviceId) {
      setProviders([]);
      return;
    }

    try {

      const response = await axios.get(
        `http://localhost:8080/providers/service/${serviceId}`
      );

      setProviders(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setAppointment({
      ...appointment,
      [name]: value
    });

    if (name === "serviceId") {

      loadProviders(value);

      setAppointment(prev => ({
        ...prev,
        serviceId: value,
        providerId: ""
      }));

    }

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!appointment.serviceId) {
    alert("Please select a service");
    return;
  }

  if (!appointment.providerId) {
    alert("Please select a provider");
    return;
  }

  try {

    await bookAppointment({
      serviceId: appointment.serviceId,
      providerId: appointment.providerId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime
    });

    alert("Appointment Booked Successfully");

    setAppointment({
      serviceId: "",
      providerId: "",
      appointmentDate: "",
      appointmentTime: ""
    });

    setProviders([]);

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Booking Failed"
    );

  }

};

  return (

    <div className="container mt-5">

      <h2 className="mb-4">Book Appointment</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label className="form-label">

            Service

          </label>

          <select
            className="form-control"
            name="serviceId"
            value={appointment.serviceId}
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

          <label className="form-label">

            Provider

          </label>

          <select
            className="form-control"
            name="providerId"
            value={appointment.providerId}
            onChange={handleChange}
          >

            <option value="">
              Select Provider
            </option>

            {providers.map((provider) => (

              <option
                key={provider.id}
                value={provider.id}
              >

                {provider.user.name} ({provider.city})

              </option>

            ))}

          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">

            Date

          </label>

          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">

            Time

          </label>

          <input
            type="time"
            className="form-control"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
          />

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >

          Book Appointment

        </button>

      </form>

    </div>

  );

}

export default BookAppointment;