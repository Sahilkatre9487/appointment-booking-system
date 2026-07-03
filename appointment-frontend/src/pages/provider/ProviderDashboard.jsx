import { useEffect, useState } from "react";
import axios from "axios";

function ProviderDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/provider/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/appointments/${id}/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Provider Dashboard</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered">

          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((a) => (
              <tr key={a.id}>

                <td>{a.id}</td>
                <td>{a.user.name}</td>
                <td>{a.service.serviceName}</td>
                <td>{a.appointmentDate}</td>
                <td>{a.appointmentTime}</td>

                <td>
                  <span className={`badge bg-${a.status === "PENDING"
                    ? "warning"
                    : a.status === "APPROVED"
                      ? "success"
                      : "danger"
                  }`}>
                    {a.status}
                  </span>
                </td>

                <td>

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => updateStatus(a.id, "approve")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(a.id, "cancel")}
                  >
                    Cancel
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default ProviderDashboard;