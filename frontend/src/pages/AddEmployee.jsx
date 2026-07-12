import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

import "../css/addemployee.css";

function AddEmployee() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    if (role !== "HR" && role !== "Manager") {
        return <Navigate to="/employees" />;
    }

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joining_time: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/add_employee", form);

            toast.success("Employee added successfully");

            navigate("/employees");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to add employee"

            );

        }

    };

    return (

        <div className="dashboard-page">

            <Sidebar />

            <div className="dashboard-content">

                <div className="add-employee-card">

                    <h2>Add Employee</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Employee Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter employee name"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Department</label>

                                <input
                                    type="text"
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    placeholder="Enter department"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Designation</label>

                                <input
                                    type="text"
                                    name="designation"
                                    value={form.designation}
                                    onChange={handleChange}
                                    placeholder="Enter designation"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Salary</label>

                                <input
                                    type="number"
                                    name="salary"
                                    value={form.salary}
                                    onChange={handleChange}
                                    placeholder="Enter salary"
                                    required
                                />

                            </div>

                            <div className="form-group full-width">

                                <label>Joining Date & Time</label>

                                <input
                                    type="datetime-local"
                                    name="joining_time"
                                    value={form.joining_time}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Add Employee
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddEmployee;