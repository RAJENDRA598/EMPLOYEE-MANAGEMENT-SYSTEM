import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

import "../css/dashboard.css";


function Dashboard() {


    const [data, setData] = useState({

        total_employees: 0,
        total_departments: 0,
        average_salary: 0,
        recent_employees: []

    });



    useEffect(()=>{

        loadDashboard();

    },[]);



    const loadDashboard = async()=>{

        try{

            const response = await api.get(
                "/dashboard"
            );


            setData(response.data);


        }catch(error){

            console.log(error);

            toast.error(
                "Dashboard data loading failed"
            );

        }

    };



    return (

        <div className="dashboard-page">


            <Sidebar />


            <div className="dashboard-content">


                <h1>
                    Dashboard
                </h1>



                <div className="dashboard-cards">


                    <div className="dashboard-card">

                        <h3>
                            Total Employees
                        </h3>

                        <p>
                            {data.total_employees}
                        </p>

                    </div>



                    <div className="dashboard-card">

                        <h3>
                            Departments
                        </h3>

                        <p>
                            {data.total_departments}
                        </p>

                    </div>




                    <div className="dashboard-card">

                        <h3>
                            Average Salary
                        </h3>

                        <p>
                            ₹ {data.average_salary}
                        </p>

                    </div>



                </div>




                <h2>
                    Recent Employees
                </h2>



                <div className="recent-box">


                {
                    data.recent_employees.length > 0 ?


                    data.recent_employees.map(
                        (emp,index)=>(


                        <div 
                        className="recent-item"
                        key={index}
                        >

                            <h3>
                                {emp.name}
                            </h3>


                            <p>
                                {emp.department}
                            </p>


                            <p>
                                {emp.designation}
                            </p>


                        </div>


                        )

                    )

                    :

                    <p>
                        No employees found
                    </p>

                }


                </div>



            </div>


        </div>

    );

}


export default Dashboard;