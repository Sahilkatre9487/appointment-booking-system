import { useEffect, useState } from "react";

import {
  getAllAppointments,
  approveAppointment,
  cancelAppointment,
  deleteAppointment
} from "../services/appointmentService";

function ManageAppointments() {

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {

    try {

      const response = await getAllAppointments();

      setAppointments(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleApprove = async (id) => {

    try {

      await approveAppointment(id);

      alert("Appointment Approved");

      loadAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  const handleCancel = async (id) => {

    try {

      await cancelAppointment(id);

      alert("Appointment Cancelled");

      loadAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete Appointment?"))
      return;

    try {

      await deleteAppointment(id);

      alert("Deleted Successfully");

      loadAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  if (loading) {

    return (

      <div className="container mt-5">

        <h3>Loading Appointments...</h3>

      </div>

    );

  }

  return (

    <div className="container mt-5">

      <h2 className="mb-4">

        Manage Appointments

      </h2>

      <table className="table table-bordered table-hover shadow">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>User</th>

            <th>Service</th>

            <th>Date</th>

            <th>Time</th>

            <th>Status</th>

            <th width="250">

              Action

            </th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr key={appointment.id}>

              <td>{appointment.id}</td>

              <td>{appointment.user.name}</td>

              <td>{appointment.service.serviceName}</td>

              <td>{appointment.appointmentDate}</td>

              <td>{appointment.appointmentTime}</td>

              <td>

                <span
                  className={
                    appointment.status === "APPROVED"
                      ? "badge bg-success"
                      : appointment.status === "PENDING"
                      ? "badge bg-warning text-dark"
                      : "badge bg-danger"
                  }
                >
                  {appointment.status}
                </span>

              </td>

              <td>

                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() =>
                    handleApprove(appointment.id)
                  }
                >
                  Approve
                </button>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    handleCancel(appointment.id)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(appointment.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageAppointments;