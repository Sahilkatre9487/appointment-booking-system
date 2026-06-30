import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookAppointment
from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
  path="/book"
  element={<BookAppointment />}
/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route
  path="/admin/appointments"
  element={<AdminDashboard />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
// hi