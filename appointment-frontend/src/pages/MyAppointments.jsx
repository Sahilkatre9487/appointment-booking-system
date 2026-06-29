import { useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointmentService";

function MyAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getMyAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      <h2>My Appointments</h2>

      <table className="table table-bordered mt-3">

        <thead>
          <tr>
            <th>ID</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.service.serviceName}</td>
              <td>{a.appointmentDate}</td>
              <td>{a.appointmentTime}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default MyAppointments;