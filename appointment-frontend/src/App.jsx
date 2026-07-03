import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

  {/* Routes with Navbar */}

  <Route element={<MainLayout />}>

    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/book"
      element={
        <ProtectedRoute>
          <BookAppointment />
        </ProtectedRoute>
      }
    />
    <Route
  path="/admin/appointments"
  element={
    <ProtectedRoute>
      <AdminAppointments />
    </ProtectedRoute>
  }
/>
<Route path="/provider/dashboard" 
element={<ProviderDashboard />} />

    <Route
      path="/my-appointments"
      element={
        <ProtectedRoute>
          <MyAppointments />
        </ProtectedRoute>
      }
    />

    <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

  </Route>

</Routes>

    </BrowserRouter>
  );
}

export default App;

// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import BookAppointment from "./pages/BookAppointment";
// import MyAppointments from "./pages/MyAppointments";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route
//           path="/book"
//           element={
//             <ProtectedRoute>
//               <BookAppointment />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/my-appointments"
//           element={
//             <ProtectedRoute>
//               <MyAppointments />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//   path="/admin/appointments"
//   element={
//     <ProtectedRoute adminOnly={true}>
//       <AdminDashboard />
//     </ProtectedRoute>
//   }
// />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;