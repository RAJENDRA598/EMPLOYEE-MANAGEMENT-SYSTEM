import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import "../css/common.css";


function Login() {


    const navigate = useNavigate();



    const [form, setForm] = useState({

        email: "",

        password: ""

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



            const response = await api.post(

                "/login",

                form

            );





            // Clear old login data

            localStorage.clear();






            // Store login details


            localStorage.setItem(

                "token",

                response.data.token

            );





            localStorage.setItem(

                "username",

                response.data.username

            );





            localStorage.setItem(

                "email",

                response.data.email

            );






            localStorage.setItem(

                "role",

                response.data.role

            );






            // Store employee id

            if(response.data.employee_id){


                localStorage.setItem(

                    "employee_id",

                    response.data.employee_id

                );


            }






            toast.success(

                "Login successful"

            );





            navigate("/dashboard");






        }


        catch(error) {



            toast.error(


                error.response?.data?.message ||


                "Login failed"


            );


        }


    };









    return (


        <div className="center-page">



            <div className="form-container">



                <h2>

                    Login

                </h2>






                <form onSubmit={handleSubmit}>




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









                    <button type="submit">


                        Login


                    </button>





                </form>









                <p>
                    <Link to="/">
                        Back to Home
                    </Link>
                </p>

                <p>
                        <Link to="/forgot-password">
                                Forgot Password?
                        </Link>
                </p>


                <p>
                     Don't have an account? {" "}
                            <Link to="/register">
                                    Register
                            </Link>
                    </p>





            </div>



        </div>


    );


}



export default Login;