import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import "../css/employee.css";


function EmployeeList() {


    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    const role = localStorage.getItem("role");


    const canManage =
        role === "HR" || role === "Manager";



    useEffect(() => {

        fetchEmployees();

    }, []);




    const fetchEmployees = async () => {

        try {

            const response = await api.get(
                "/employees"
            );

            setEmployees(response.data);


        } catch {

            toast.error(
                "Unable to fetch employees"
            );

        }
        finally {

            setLoading(false);

        }

    };





    const deleteEmployee = async(id) => {


        try {


            await api.delete(
                `/delete_employee/${id}`
            );


            toast.success(
                "Employee deleted successfully"
            );


            fetchEmployees();



        } catch(error) {


            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );


        }

    };





    const filteredEmployees = employees.filter(
        (emp) =>

            emp.name
            ?.toLowerCase()
            .includes(search.toLowerCase())

            ||

            emp.email
            ?.toLowerCase()
            .includes(search.toLowerCase())

            ||

            emp.department
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );





    if(loading){

        return <Loader />;

    }




    return (

        <div className="employee-page">


            <Sidebar />



            <div className="employee-content">



                <div className="employee-header">


                    <h1>
                        Employees
                    </h1>



                    {
                        canManage &&

                        <Link
                            to="/add-employee"
                            className="add-btn"
                        >

                            + Add Employee

                        </Link>

                    }


                </div>





                <div className="employee-card">



                    <div className="search-box">


                        <input

                            type="text"

                            placeholder="Search employee..."

                            value={search}

                            onChange={(e)=>
                                setSearch(e.target.value)
                            }

                        />


                    </div>





                    <table className="employee-table">


                        <thead>


                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Department</th>

                                <th>Designation</th>

                                <th>Actions</th>


                            </tr>


                        </thead>





                        <tbody>



                        {
                            filteredEmployees.length > 0 ?


                            filteredEmployees.map((emp)=>(


                                <tr key={emp.employee_id}>


                                    <td>
                                        {emp.name}
                                    </td>


                                    <td>
                                        {emp.email}
                                    </td>


                                    <td>
                                        {emp.department}
                                    </td>


                                    <td>
                                        {emp.designation}
                                    </td>



                                    <td>


                                    {
                                        canManage &&

                                        <>

                                        <Link

                                        to={`/edit-employee/${emp.employee_id}`}

                                        className="edit-btn"

                                        >

                                            Edit

                                        </Link>



                                        <button

                                        className="delete-btn"

                                        onClick={()=>
                                            deleteEmployee(
                                                emp.employee_id
                                            )
                                        }

                                        >

                                            Delete

                                        </button>

                                        </>

                                    }



                                    </td>


                                </tr>


                            ))


                            :


                            <tr>


                                <td colSpan="5">

                                    No employees found

                                </td>


                            </tr>


                        }



                        </tbody>


                    </table>



                </div>


            </div>


        </div>

    );

}


export default EmployeeList;