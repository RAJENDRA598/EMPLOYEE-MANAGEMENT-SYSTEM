import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import "../css/common.css";


function Register() {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        username: "",
        email: "",
        password: "",
        role: "Employee"

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

            await api.post(
                "/register",
                form
            );


            toast.success(
                "Registration successful"
            );


            navigate("/login");


        }
        catch(error) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };




    return (

        <div className="center-page">


            <div className="form-container">


                <h2>
                    Register
                </h2>



                <form onSubmit={handleSubmit}>


                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />



                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />



                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />



                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                    >

                        <option value="Employee">
                            Employee
                        </option>


                        <option value="Manager">
                            Manager
                        </option>


                        <option value="HR">
                            HR
                        </option>


                    </select>




                    <button type="submit">

                        Register

                    </button>


                </form>




                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>


                </p>



            </div>


        </div>

    );

}


export default Register;