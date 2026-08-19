import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import "../css/changepassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",
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

            toast.error("Passwords do not match");

            return;

        }

        try {

            await api.put("/forgot_password", {

                email: form.email,
                new_password: form.new_password

            });

            toast.success("Password reset successfully");

            setForm({

                email: "",
                new_password: "",
                confirm_password: ""

            });

            navigate("/login");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password reset failed"

            );

        }

    };

    return (

        <div className="change-password-page">

            <div className="change-password-content">

                <div className="password-card">

                    <h2>Forgot Password</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={form.email}
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

                            Reset Password

                        </button>

                    </form>

                    <p>
                        <Link to="/login">
                            Back to Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>

    );

}

export default ForgotPassword;
