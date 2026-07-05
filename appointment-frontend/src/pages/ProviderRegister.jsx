import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerProvider } from "../services/authService";
import { getAllServices } from "../services/appointmentService";

function ProviderRegister() {

    const navigate = useNavigate();

    const [services, setServices] = useState([]);

    const [provider, setProvider] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        city: "",
        description: "",
        serviceId: ""
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

        setProvider({
            ...provider,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerProvider(provider);

            alert(
                "Registration submitted successfully.\n\nYour account is pending admin approval."
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Become a Service Provider
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Business / Provider Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={provider.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={provider.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={provider.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={provider.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={provider.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={provider.city}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Select Service
                                    </label>

                                    <select
                                        className="form-select"
                                        name="serviceId"
                                        value={provider.serviceId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Service
                                        </option>

                                        {

                                            services.map(service => (

                                                <option
                                                    key={service.id}
                                                    value={service.id}
                                                >
                                                    {service.serviceName}
                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Business Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="description"
                                        value={provider.description}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >
                                    Register as Provider
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProviderRegister;