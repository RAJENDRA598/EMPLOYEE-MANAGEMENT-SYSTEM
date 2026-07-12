import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

import "../css/performance.css";


function Performance() {


    const role = localStorage.getItem("role");


    const [employeeId, setEmployeeId] = useState("");
    const [rating, setRating] = useState("Good");
    const [review, setReview] = useState("");

    const [list, setList] = useState([]);

    const [editId, setEditId] = useState(null);





    useEffect(() => {

        loadPerformance();

    }, []);






    const loadPerformance = async () => {

        try {

            const response = await api.get(
                "/performance"
            );

            setList(response.data);

        }
        catch {

            toast.error(
                "Unable to load performance"
            );

        }

    };









    const submit = async (e) => {

        e.preventDefault();


        try {


            if (editId) {


                await api.put(

                    `/update_performance/${editId}`,

                    {

                        rating: rating,

                        review: review

                    }

                );


                toast.success(
                    "Performance Updated Successfully"
                );


            }

            else {


                await api.post(

                    "/performance",

                    {

                        employee_id: employeeId,

                        rating: rating,

                        review: review

                    }

                );


                toast.success(
                    "Performance Added Successfully"
                );


            }



            clearForm();

            loadPerformance();


        }
        catch (error) {


            toast.error(

                error.response?.data?.message ||

                "Operation Failed"

            );


        }


    };









    const editPerformance = (item) => {


        setEditId(
            item.performance_id
        );


        setEmployeeId(
            item.employee_id
        );


        setRating(
            item.rating
        );


        setReview(
            item.review
        );


    };









    const deletePerformance = async (id) => {


        try {


            await api.delete(

                `/performance/${id}`

            );


            toast.success(
                "Performance Deleted Successfully"
            );


            loadPerformance();


        }
        catch {


            toast.error(
                "Delete Failed"
            );


        }


    };









    const clearForm = () => {


        setEditId(null);

        setEmployeeId("");

        setRating("Good");

        setReview("");


    };









    return (


        <div className="performance-page">


            <Sidebar />



            <div className="performance-content">


                <div className="performance-card">



                    <h2>
                        Performance Management
                    </h2>





                    {

                        (role === "HR" ||
                         role === "Manager") &&


                        <form

                            className="performance-form"

                            onSubmit={submit}

                        >



                            <input

                                type="number"

                                placeholder="Employee ID"

                                value={employeeId}

                                onChange={(e) =>
                                    setEmployeeId(
                                        e.target.value
                                    )
                                }

                                required

                            />





                            <select

                                value={rating}

                                onChange={(e) =>
                                    setRating(
                                        e.target.value
                                    )
                                }

                            >

                                <option>
                                    Excellent
                                </option>

                                <option>
                                    Very Good
                                </option>

                                <option>
                                    Good
                                </option>

                                <option>
                                    Average
                                </option>

                                <option>
                                    Poor
                                </option>


                            </select>






                            <textarea

                                placeholder="Review"

                                value={review}

                                onChange={(e) =>
                                    setReview(
                                        e.target.value
                                    )
                                }

                                required

                            />







                            <button type="submit">


                                {

                                    editId ?

                                    "Update Performance"

                                    :

                                    "Save Performance"

                                }


                            </button>






                            {

                                editId &&


                                <button

                                    type="button"

                                    onClick={clearForm}

                                >

                                    Cancel

                                </button>


                            }



                        </form>


                    }









                    <table className="performance-table">


                        <thead>


                            <tr>


                                <th>
                                    Employee ID
                                </th>


                                <th>
                                    Rating
                                </th>


                                <th>
                                    Review
                                </th>


                                <th>
                                    Date
                                </th>





                                {

                                    (role === "HR" ||
                                     role === "Manager") &&


                                    <th>
                                        Actions
                                    </th>


                                }


                            </tr>


                        </thead>








                        <tbody>


                            {


                                list.length > 0 ?


                                list.map((item) => (


                                    <tr key={item.performance_id}>


                                        <td>
                                            {item.employee_id}
                                        </td>


                                        <td>
                                            {item.rating}
                                        </td>


                                        <td>
                                            {item.review}
                                        </td>


                                        <td>
                                            {item.review_date}
                                        </td>






                                        {

                                            (role === "HR" ||
                                             role === "Manager") &&



                                            <td>


                                                <button

                                                    className="edit-btn"

                                                    type="button"

                                                    onClick={() =>
                                                        editPerformance(item)
                                                    }

                                                >

                                                    Edit

                                                </button>






                                                <button

                                                    className="delete-btn"

                                                    type="button"

                                                    onClick={() =>
                                                        deletePerformance(
                                                            item.performance_id
                                                        )
                                                    }

                                                >

                                                    Delete

                                                </button>



                                            </td>


                                        }



                                    </tr>


                                ))



                                :



                                <tr>


                                    <td colSpan="5">

                                        No Performance Records

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


export default Performance;