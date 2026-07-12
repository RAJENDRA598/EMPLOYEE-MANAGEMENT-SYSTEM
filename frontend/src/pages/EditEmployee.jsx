import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

import "../css/addemployee.css";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        address: ""

    });

    useEffect(() => {

        getEmployee();

    }, []);

    const getEmployee = async () => {

        try {

            const response = await api.get(`/employee/${id}`);

            setForm(response.data);

        } catch (error) {

            toast.error("Unable to load employee");

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(

                `/update_employee/${id}`,

                form

            );

            toast.success("Employee updated successfully");

            navigate("/employees");

        } catch (error) {

            toast.error("Update failed");

        }

    };

    return (

        <div className="dashboard-page">

            <Sidebar />

            <div className="dashboard-content">

                <div className="add-employee-card">

                    <h2>Edit Employee</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Employee Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Employee Name"
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
                                    placeholder="Email"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone || ""}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />

                            </div>

                            <div className="form-group">

                                <label>Department</label>

                                <input
                                    type="text"
                                    name="department"
                                    value={form.department || ""}
                                    onChange={handleChange}
                                    placeholder="Department"
                                />

                            </div>

                            <div className="form-group">

                                <label>Designation</label>

                                <input
                                    type="text"
                                    name="designation"
                                    value={form.designation || ""}
                                    onChange={handleChange}
                                    placeholder="Designation"
                                />

                            </div>

                            <div className="form-group">

                                <label>Salary</label>

                                <input
                                    type="number"
                                    name="salary"
                                    value={form.salary || ""}
                                    onChange={handleChange}
                                    placeholder="Salary"
                                />

                            </div>

                            <div className="form-group full-width">

                                <label>Joining Date & Time</label>

                                     <input
                                             type="datetime-local"
                                             name="joining_time"
                                             value={form.joining_time || ""}
                                             onChange={handleChange}
                                             required
                                             />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Update Employee
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditEmployee;