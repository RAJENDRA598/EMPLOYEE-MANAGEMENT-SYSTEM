import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

import "../css/leave.css";


function Leave() {

    const role = localStorage.getItem("role");
    const loginEmployeeId = localStorage.getItem("employee_id");


    const [employeeId, setEmployeeId] = useState(
        loginEmployeeId || ""
    );

    const [reason, setReason] = useState("");
    const [leaveDate, setLeaveDate] = useState("");
    const [list, setList] = useState([]);



    useEffect(() => {
        loadLeaves();
    }, []);




    // Load Leaves
    const loadLeaves = async () => {

        try {

            const response = await api.get("/leaves");

            let data = response.data;


            // Employee sees only own leaves
            if (role === "Employee") {

                data = data.filter(
                    (item) =>
                        item.employee_id == loginEmployeeId
                );

            }


            setList(data);


        } catch (error) {

            toast.error(
                "Unable to load leaves"
            );

        }

    };







    // Apply Leave
    const submit = async (e) => {

        e.preventDefault();


        if (role !== "Employee") {
            return;
        }


        try {


            await api.post(
                "/apply_leave",
                {
                    employee_id: employeeId,
                    reason: reason,
                    leave_date: leaveDate
                }
            );


            toast.success(
                "Leave Applied Successfully"
            );


            setReason("");
            setLeaveDate("");


            loadLeaves();


        } catch (error) {


            toast.error(
                error.response?.data?.message ||
                "Leave Apply Failed"
            );

        }

    };








    // Approve Leave
    const approveLeave = async (id) => {

        try {

            await api.put(
                `/update_leave/${id}`,
                {
                    status: "Approved"
                }
            );


            toast.success(
                "Leave Approved"
            );


            loadLeaves();


        } catch (error) {

            toast.error(
                "Approval Failed"
            );

        }

    };







    // Reject Leave
    const rejectLeave = async (id) => {

        try {


            await api.put(
                `/update_leave/${id}`,
                {
                    status: "Rejected"
                }
            );


            toast.success(
                "Leave Rejected"
            );


            loadLeaves();


        } catch (error) {


            toast.error(
                "Reject Failed"
            );

        }

    };








    // Delete Leave
    const deleteLeave = async (id) => {


        try {


            await api.delete(
                `/delete_leave/${id}`
            );


            toast.success(
                "Leave Deleted"
            );


            loadLeaves();


        } catch (error) {


            toast.error(
                "Delete Failed"
            );

        }

    };








    return (

        <div className="leave-page">


            <Sidebar />


            <div className="leave-content">


                <div className="leave-card">


                    <h2>
                        Leave Management
                    </h2>





                    {
                        role === "Employee" &&


                        <form
                            className="leave-form"
                            onSubmit={submit}
                        >


                            <input
                                type="number"
                                placeholder="Employee ID"
                                value={employeeId}
                                disabled
                                required
                            />



                            <textarea
                                placeholder="Leave Reason"
                                value={reason}
                                onChange={(e) =>
                                    setReason(e.target.value)
                                }
                                required
                            />



                            <input
                                type="date"
                                value={leaveDate}
                                onChange={(e) =>
                                    setLeaveDate(e.target.value)
                                }
                                required
                            />



                            <button type="submit">
                                Apply Leave
                            </button>


                        </form>

                    }








                    <table className="leave-table">


                        <thead>

                            <tr>

                                <th>
                                    Employee ID
                                </th>


                                <th>
                                    Reason
                                </th>


                                <th>
                                    Date
                                </th>


                                <th>
                                    Status
                                </th>



                                {
                                    (role === "HR" || role === "Manager") &&

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

                                        <tr key={item.leave_id}>


                                            <td>
                                                {item.employee_id}
                                            </td>



                                            <td>
                                                {item.reason}
                                            </td>



                                            <td>
                                                {item.leave_date}
                                            </td>





                                            <td>

                                                {
                                                    item.status === "Approved"

                                                        ?

                                                        <span className="approved">
                                                            Approved
                                                        </span>


                                                        :

                                                        item.status === "Rejected"

                                                            ?

                                                            <span className="rejected">
                                                                Rejected
                                                            </span>


                                                            :

                                                            <span className="pending">
                                                                Pending
                                                            </span>

                                                }


                                            </td>







                                            {

                                                (role === "HR" || role === "Manager") &&


                                                <td>


                                                    {

                                                        item.status === "Pending" &&

                                                        <>


                                                            <button
                                                                className="edit-btn"
                                                                onClick={() =>
                                                                    approveLeave(item.leave_id)
                                                                }
                                                            >

                                                                Approve

                                                            </button>





                                                            <button
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    rejectLeave(item.leave_id)
                                                                }
                                                            >

                                                                Reject

                                                            </button>


                                                        </>


                                                    }





                                                    {

                                                        role === "HR" &&


                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                deleteLeave(item.leave_id)
                                                            }
                                                        >

                                                            Delete

                                                        </button>


                                                    }


                                                </td>

                                            }



                                        </tr>


                                    ))


                                    :


                                    <tr>

                                        <td colSpan="5">
                                            No Leave Records
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


export default Leave;