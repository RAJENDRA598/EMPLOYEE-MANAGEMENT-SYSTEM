import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../css/home.css";



function Home() {


    const [showLearn, setShowLearn] = useState(false);



    return (


        <>


            <Navbar />



            <section className="hero-section">





                <div className="hero-image">


                    <img

                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"

                        alt="Employees"

                    />


                </div>







                <div className="hero-content">


                    <h1>

                        Employee Management System

                    </h1>





                    <p>

                        Manage employees, departments, salaries,
                        attendance and employee records with a modern,
                        secure and easy-to-use HR Management System.

                    </p>







                    <div className="hero-buttons">





                        <Link

                            to="/login"

                            className="btn btn-primary"

                        >

                            Sign In

                        </Link>




                    </div>



                </div>



            </section>









            {


                showLearn &&


                <section className="learn-box">


                    <h2>

                        How to use EmployeeMS?

                    </h2>





                    <p>


                        1. Click Get Started to login or create an account.


                        <br /><br />


                        2. After login, open the Dashboard.


                        <br /><br />


                        3. Add employee details using Add Employee option.


                        <br /><br />


                        4. View, update and delete employee information.


                        <br /><br />


                        5. Manage all employee records easily.



                    </p>



                </section>



            }







            <Footer />



        </>


    );


}


export default Home;