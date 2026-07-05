import { useEffect, useState } from "react";

import {
    getPendingProviders,
    approveProvider,
    rejectProvider
} from "../services/providerService";

function AdminProviders() {

    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProviders();
    }, []);

    const loadProviders = async () => {

        try {

            const response = await getPendingProviders();

            setProviders(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleApprove = async (id) => {

        try {

            await approveProvider(id);

            alert("Provider Approved Successfully");

            loadProviders();

        } catch (error) {

            console.log(error);

            alert("Unable to approve provider");

        }

    };

    const handleReject = async (id) => {

        try {

            await rejectProvider(id);

            alert("Provider Rejected");

            loadProviders();

        } catch (error) {

            console.log(error);

            alert("Unable to reject provider");

        }

    };

    if (loading) {

        return (

            <div className="container mt-5">

                <h3>Loading Providers...</h3>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <h2 className="mb-4">

                Pending Provider Registrations

            </h2>

            {

                providers.length === 0 ?

                    (

                        <div className="alert alert-success">

                            No Pending Providers

                        </div>

                    )

                    :

                    (

                        <table className="table table-bordered table-hover shadow">

                            <thead className="table-dark">

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>City</th>

                                    <th>Service</th>

                                    <th>Status</th>

                                    <th width="220">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    providers.map(provider => (

                                        <tr key={provider.id}>

                                            <td>{provider.user.name}</td>

                                            <td>{provider.user.email}</td>

                                            <td>{provider.phone}</td>

                                            <td>{provider.city}</td>

                                            <td>{provider.service.serviceName}</td>

                                            <td>

                                                <span className="badge bg-warning text-dark">

                                                    {provider.status}

                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleApprove(provider.id)}
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleReject(provider.id)}
                                                >
                                                    Reject
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    )

            }

        </div>

    );

}

export default AdminProviders;