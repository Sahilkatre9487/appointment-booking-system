import { useEffect, useState } from "react";
import {
  getAllAppointments,
  approveAppointment,
  cancelAppointment,
  getDashboardStats,
  getAppointmentsByStatus,
  getAppointmentsByDate,
  getAppointmentsByService,
  getAppointmentsPage,
} from "../services/appointmentService";
import { useNavigate } from "react-router-dom";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("appointmentDate");
  const navigate = useNavigate();



  useEffect(() => {
    loadAppointments();
    loadDashboard();
  }, [page, sortBy]);

  const loadAppointments = async () => {
    try {
      const response = await getAppointmentsPage(
        page,
        size,
        sortBy
  );


      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
      
    } catch (error) {
      console.log(error);
    }
  };
  const loadDashboard = async () => {
  try {
    const response = await getDashboardStats();
    setDashboard(response.data);
  } catch (error) {
    console.log(error);
  }
};
const filterByStatus = async (status) => {

  if (status === "ALL") {
    loadAppointments();
    return;
  }

  try {
    const response = await getAppointmentsByStatus(status);
    setAppointments(response.data);
  } catch (error) {
    console.log(error);
  }
};

const handleServiceSearch = async () => {
  if (!serviceName) {
    loadAppointments();
    return;
  }

  try {
    const response = await getAppointmentsByService(serviceName);
    setAppointments(response.data);
  } catch (error) {
    console.log(error);
  }
};
const handleDateSearch = async () => {
  if (!selectedDate) {
    loadAppointments();
    return;
  }

  try {
    const response =
      await getAppointmentsByDate(selectedDate);

    setAppointments(response.data);

  } catch (error) {
    console.log(error);
  }
};


  const handleApprove = async (id) => {
    await approveAppointment(id);
    loadAppointments();
  };

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    loadAppointments();
  };
  const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};

  return (
    <div className="container mt-5">
        <div className="row mb-4">

  <div className="col-md-3">
    <div className="card bg-primary text-white">
      <div className="card-body text-center">
        <h5>Total</h5>
        <h2>{dashboard.totalAppointments}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-warning">
      <div className="card-body text-center">
        <h5>Pending</h5>
        <h2>{dashboard.pendingAppointments}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-success text-white">
      <div className="card-body text-center">
        <h5>Approved</h5>
        <h2>{dashboard.approvedAppointments}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-danger text-white">
      <div className="card-body text-center">
        <h5>Cancelled</h5>
        <h2>{dashboard.cancelledAppointments}</h2>
      </div>
    </div>
  </div>

</div>
      <h2>All Appointments</h2>

      <div className="mb-3">
  <select
    className="form-select"
    onChange={(e) => filterByStatus(e.target.value)}
  >
    <option value="ALL">All</option>
    <option value="PENDING">Pending</option>
    <option value="APPROVED">Approved</option>
    <option value="CANCELLED">Cancelled</option>
  </select>
</div>

<div className="row mb-3">

  <div className="col-md-4">
    <input
      type="date"
      className="form-control"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <button
      className="btn btn-primary"
      onClick={handleDateSearch}
    >
      Search
    </button>
  </div>

</div>

<div className="row mb-3">

  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Enter Service Name"
      value={serviceName}
      onChange={(e) => setServiceName(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <button
      className="btn btn-success"
      onClick={handleServiceSearch}
    >
      Search Service
    </button>
  </div>

</div>

      <div className="mb-3">
  <select
    className="form-select w-25"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="appointmentDate">Appointment Date</option>
    <option value="status">Status</option>
    <option value="appointmentTime">Appointment Time</option>
    <option value="id">ID</option>
  </select>
</div>

      <table className="table table-bordered mt-4">
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
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.user.name}</td>
              <td>{appointment.service.serviceName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.status}</td>

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
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleCancel(appointment.id)
                  }
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-3">

<button
className="btn btn-secondary"
disabled={page===0}
onClick={()=>setPage(page-1)}
>
Previous
</button>

<button
className="btn btn-primary"
onClick={()=>setPage(page+1)}
>
Next
</button>

</div>

      <button
  className="btn btn-danger float-end"
  onClick={handleLogout}
>
  Logout
</button>
    </div>
  );
}

export default AdminAppointments;