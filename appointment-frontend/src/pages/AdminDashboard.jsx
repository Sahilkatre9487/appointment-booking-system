import { useEffect, useState } from "react";
import {
  getAllAppointments,
  approveAppointment,
  cancelAppointment,
  deleteAppointment,
  updateAppointment,
  getDashboardStats,
  getAppointmentsByStatus,
  getAppointmentsByDate,
  getAppointmentsByService,
  getAppointmentsPage,
  exportAppointmentsToExcel,
  exportAppointmentsToPdf,
} from "../services/appointmentService";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

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
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editStatus, setEditStatus] = useState("");



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
  if (serviceName === "") {
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
      const handleDelete = async (id) => {
  if (!window.confirm("Delete this appointment?")) {
    return;
  }

  try {
    await deleteAppointment(id);
    loadAppointments();
  } catch (error) {
    console.log(error);
    alert("Unable to delete appointment");
  }
};
const handleExportExcel = async () => {
  try {
    const response = await exportAppointmentsToExcel();

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      "appointments.xlsx"
    );

    document.body.appendChild(link);

    link.click();

    link.remove();
  } catch (error) {
    console.log(error);
    alert("Unable to export Excel");
  }
};
const handleExportPdf = async () => {
  try {

    const response = await exportAppointmentsToPdf();

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "appointments.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.log(error);
    alert("PDF Export Failed");
  }
};

const handleUpdate = async () => {
  try {
    await updateAppointment(editingAppointment.id, {
      ...editingAppointment,
      status: editStatus,
    });

    setEditingAppointment(null);
    loadAppointments();

    alert("Appointment Updated Successfully");
  } catch (error) {
    console.log(error);
    alert("Unable to update appointment");
  }
};


  const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};
const chartData = {
  labels: ["Approved", "Pending", "Cancelled"],

  datasets: [
    {
      data: [
        dashboard.approvedAppointments || 0,
        dashboard.pendingAppointments || 0,
        dashboard.cancelledAppointments || 0,
      ],

      backgroundColor: [
        "#198754",
        "#ffc107",
        "#dc3545",
      ],
    },
  ],
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
      <div className="row mt-3">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search by Service"
      value={serviceName}
      onChange={(e) => setServiceName(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <button
      className="btn btn-dark"
      onClick={handleServiceSearch}
    >
      Search
    </button>
  </div>
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
              <td>
  <span
    className={`badge ${
      appointment.status === "APPROVED"
        ? "bg-success"
        : appointment.status === "PENDING"
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
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
  className="btn btn-danger btn-sm me-2"
  onClick={() => handleCancel(appointment.id)}
>
  Cancel
</button>

<button
  className="btn btn-info btn-sm me-2"
  onClick={() => setSelectedAppointment(appointment)}
>
  View
</button>

<button
  className="btn btn-warning btn-sm me-2"
  onClick={() => {
    setEditingAppointment(appointment);
    setEditStatus(appointment.status);
  }}
>
  Edit
</button>

<button
  className="btn btn-dark btn-sm"
  onClick={() => handleDelete(appointment.id)}
>
  Delete
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
 <div className="row mt-4">
  <div className="col-md-6 mx-auto">

    <div className="card shadow">

      <div className="card-header text-center">
        <h4>Appointment Status Overview</h4>
      </div>

      <div className="card-body">
        <Pie data={chartData} />
      </div>

    </div>

  </div>
</div>

          <button
  className="btn btn-success me-2"
  onClick={handleExportExcel}
>
  Export Excel
</button>

<button
    className="btn btn-primary"
    onClick={handleExportPdf}
  >
    Export PDF
  </button>
      <button
  className="btn btn-danger float-end"
  onClick={handleLogout}
>
  Logout
</button>

          {selectedAppointment && (
  <div
    className="modal d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Appointment Details
          </h5>

          <button
            className="btn-close"
            onClick={() => setSelectedAppointment(null)}
          ></button>
        </div>

        <div className="modal-body">

          <p><strong>ID:</strong> {selectedAppointment.id}</p>

          <p><strong>User:</strong> {selectedAppointment.user.name}</p>

          <p><strong>Email:</strong> {selectedAppointment.user.email}</p>

          <p><strong>Service:</strong> {selectedAppointment.service.serviceName}</p>

          <p><strong>Date:</strong> {selectedAppointment.appointmentDate}</p>

          <p><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>

          <p><strong>Status:</strong> {selectedAppointment.status}</p>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setSelectedAppointment(null)}
          >
            Close
          </button>

        </div>

      </div>
    </div>
  </div>
)}

    {editingAppointment && (
  <div
    className="modal d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5>Edit Appointment</h5>

          <button
            className="btn-close"
            onClick={() => setEditingAppointment(null)}
          ></button>
        </div>

        <div className="modal-body">

          <p>
            <strong>User:</strong>{" "}
            {editingAppointment.user.name}
          </p>

          <p>
            <strong>Service:</strong>{" "}
            {editingAppointment.service.serviceName}
          </p>

          <label className="form-label">
            Status
          </label>

          <select
            className="form-select"
            value={editStatus}
            onChange={(e) =>
              setEditStatus(e.target.value)
            }
          >
            <option value="PENDING">
              PENDING
            </option>

            <option value="APPROVED">
              APPROVED
            </option>

            <option value="CANCELLED">
              CANCELLED
            </option>
          </select>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setEditingAppointment(null)}
          >
            Close
          </button>

          <button
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Update
          </button>

        </div>

      </div>
    </div>
  </div>
)}
          
    </div>
  );
}

export default AdminAppointments;