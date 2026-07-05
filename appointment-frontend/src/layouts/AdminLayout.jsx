import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="container-fluid">

            <div className="row">

                {/* Sidebar */}

                <div
                    className="col-md-2 bg-dark text-white min-vh-100 p-3"
                >

                    <h3 className="text-center mb-4">

                        EasyBook

                    </h3>

                    <div className="d-grid gap-2">

                        <Link
                            to="/admin/dashboard"
                            className="btn btn-outline-light text-start"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/appointments"
                            className="btn btn-outline-light text-start"
                        >
                            Appointments
                        </Link>

                        <Link
                            to="/admin/providers"
                            className="btn btn-outline-light text-start"
                        >
                            Providers
                        </Link>

                        <Link
                            to="/admin/services"
                            className="btn btn-outline-light text-start"
                        >
                            Services
                        </Link>

                        <Link
                            to="/admin/customers"
                            className="btn btn-outline-light text-start"
                        >
                            Customers
                        </Link>

                        <button
                            className="btn btn-danger mt-4"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Main Content */}

                <div className="col-md-10 p-4">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;