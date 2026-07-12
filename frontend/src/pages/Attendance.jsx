import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

import "../css/attendance.css";

function Attendance() {

    const role = localStorage.getItem("role");

    const [employeeId, setEmployeeId] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Present");

    const [list, setList] = useState([]);

    useEffect(() => {

        loadAttendance();

    }, []);

    // -----------------------------
    // Load Attendance
    // -----------------------------

    const loadAttendance = async () => {

        try {

            const res = await api.get("/attendance");

            setList(res.data);

        }

        catch {

            toast.error("Unable to load attendance");

        }

    };

    // -----------------------------
    // Employee Mark Attendance
    // -----------------------------

    const submit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/attendance", {

                employee_id: employeeId,
                attendance_date: date,
                status: status

            });

            toast.success("Attendance Submitted");

            setEmployeeId("");
            setDate("");
            setStatus("Present");

            loadAttendance();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to submit attendance"

            );

        }

    };

    // -----------------------------
    // HR Verify Attendance
    // -----------------------------

    const verify = async (id, decision) => {

        try {

            await api.put(

                `/update_attendance/${id}`,

                {

                    status: decision

                }

            );

            toast.success("Attendance Verified");

            loadAttendance();

        }

        catch {

            toast.error("Verification Failed");

        }

    };

    // -----------------------------
    // Delete Attendance
    // -----------------------------

    const removeAttendance = async (id) => {

        try {

            await api.delete(

                `/delete_attendance/${id}`

            );

            toast.success("Attendance Deleted");

            loadAttendance();

        }

        catch {

            toast.error("Delete Failed");

        }

    };

    // -----------------------------
    // Finalize Today's Attendance
    // -----------------------------

    const finalizeAttendance = async () => {

        try {

            await api.post("/finalize_attendance");

            toast.success("Today's Attendance Finalized");

            loadAttendance();

        }

        catch {

            toast.error("Unable to Finalize Attendance");

        }

    };

    return (

        <div className="attendance-page">

            <Sidebar />

            <div className="attendance-content">

                <div className="attendance-card">

                    <h2>Attendance Management</h2>

                    <form

                        className="attendance-form"

                        onSubmit={submit}

                    >

                        <input

                            type="number"

                            placeholder="Employee ID"

                            value={employeeId}

                            onChange={(e) =>

                                setEmployeeId(e.target.value)

                            }

                            required

                        />

                        <input

                            type="date"

                            value={date}

                            onChange={(e) =>

                                setDate(e.target.value)

                            }

                            required

                        />

                        <select

                            value={status}

                            onChange={(e) =>

                                setStatus(e.target.value)

                            }

                        >

                            <option value="Present">

                                Present

                            </option>

                            <option value="Absent">

                                Absent

                            </option>

                        </select>

                        <button type="submit">

                            Mark Attendance

                        </button>

                    </form>

                    {

                        (role === "HR" ||

                            role === "Manager") &&

                        <button

                            className="finalize-btn"

                            onClick={finalizeAttendance}

                        >

                            Finalize Today's Attendance

                        </button>

                    }

                    <table className="attendance-table">

                        <thead>

                            <tr>

                                <th>Employee ID</th>

                                <th>Date</th>

                                <th>Employee Status</th>

                                <th>HR Status</th>

                                <th>Final Status</th>

                                {

                                    (role === "HR" ||

                                        role === "Manager") &&

                                    <th>Actions</th>

                                }

                            </tr>

                        </thead>

                        <tbody>

                            {

                                list.length > 0 ?

                                    list.map((item) => (

                                        <tr key={item.attendance_id}>

                                            <td>

                                                {item.employee_id}

                                            </td>

                                            <td>

                                                {item.attendance_date}

                                            </td>

                                            <td>

                                                {item.employee_status}

                                            </td>

                                            <td>

                                                {item.hr_status}

                                            </td>

                                            <td>

                                                {item.final_status}

                                            </td>

                                            {

                                                (role === "HR" ||

                                                    role === "Manager") &&

                                                <td>

                                                    {

                                                        item.hr_status === "Pending" &&

                                                        <>

                                                            <button

                                                                className="approve-btn"

                                                                onClick={() =>

                                                                    verify(

                                                                        item.attendance_id,

                                                                        "Approved"

                                                                    )

                                                                }

                                                            >

                                                                Approve

                                                            </button>

                                                            <button

                                                                className="reject-btn"

                                                                onClick={() =>

                                                                    verify(

                                                                        item.attendance_id,

                                                                        "Rejected"

                                                                    )

                                                                }

                                                            >

                                                                Reject

                                                            </button>

                                                        </>

                                                    }

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>

                                                            removeAttendance(

                                                                item.attendance_id

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

                                        <td colSpan="6">

                                            No Attendance Records

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

export default Attendance;