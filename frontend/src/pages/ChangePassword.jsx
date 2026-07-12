import { useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

import "../css/changepassword.css";

function ChangePassword() {

    const email = localStorage.getItem("email");

    const [form, setForm] = useState({

        current_password: "",
        new_password: "",
        confirm_password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.new_password !== form.confirm_password) {

            toast.error("New passwords do not match");

            return;

        }

        try {

            await api.put("/change_password", {

                email: email,
                current_password: form.current_password,
                new_password: form.new_password

            });

            toast.success("Password changed successfully");

            setForm({

                current_password: "",
                new_password: "",
                confirm_password: ""

            });

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password change failed"

            );

        }

    };

    return (

        <div className="change-password-page">

            <Sidebar />

            <div className="change-password-content">

                <div className="password-card">

                    <h2>Change Password</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="password"
                            name="current_password"
                            placeholder="Current Password"
                            value={form.current_password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="new_password"
                            placeholder="New Password"
                            value={form.new_password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm New Password"
                            value={form.confirm_password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">

                            Change Password

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default ChangePassword;