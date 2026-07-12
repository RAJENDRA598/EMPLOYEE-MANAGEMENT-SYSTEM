import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

import "../css/resume.css";


function Resume() {


    const role = localStorage.getItem("role");


    const [employeeId, setEmployeeId] = useState("");
    const [qualification, setQualification] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [resume, setResume] = useState(null);


    const [list, setList] = useState([]);

    const [editId, setEditId] = useState(null);




    useEffect(() => {

        loadResume();

    }, []);







    const loadResume = async () => {

        try {

            const res = await api.get("/resume");

            setList(res.data);


        } catch {


            toast.error(
                "Unable to load resumes"
            );

        }

    };









    const submit = async (e) => {

        e.preventDefault();


        try {


            // UPDATE RESUME

            if (editId) {


                await api.put(

                    `/update_resume/${editId}`,

                    {
                        qualification,
                        skills,
                        experience
                    }

                );


                toast.success(
                    "Resume Updated Successfully"
                );


            }



            // ADD RESUME

            else {


                if (!resume) {


                    toast.error(
                        "Please select PDF"
                    );

                    return;

                }





                const formData = new FormData();



                formData.append(
                    "employee_id",
                    employeeId
                );


                formData.append(
                    "qualification",
                    qualification
                );


                formData.append(
                    "skills",
                    skills
                );


                formData.append(
                    "experience",
                    experience
                );


                formData.append(
                    "resume",
                    resume
                );






                await api.post(

                    "/resume",

                    formData,

                    {

                        headers: {

                            "Content-Type":
                                "multipart/form-data"

                        }

                    }

                );



                toast.success(
                    "Resume Uploaded Successfully"
                );


            }





            clearForm();

            loadResume();



        } catch (error) {


            toast.error(

                error.response?.data?.message ||

                "Operation Failed"

            );

        }


    };









    const editResume = (item) => {


        setEditId(
            item.resume_id
        );


        setEmployeeId(
            item.employee_id
        );


        setQualification(
            item.qualification
        );


        setSkills(
            item.skills
        );


        setExperience(
            item.experience
        );



        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    };









    const deleteResume = async (id) => {


        try {


            await api.delete(

                `/resume/${id}`

            );


            toast.success(
                "Resume Deleted"
            );


            loadResume();



        } catch {


            toast.error(
                "Delete Failed"
            );

        }


    };









    const clearForm = () => {


        setEditId(null);

        setEmployeeId("");

        setQualification("");

        setSkills("");

        setExperience("");

        setResume(null);




        const file =
            document.getElementById(
                "resumeFile"
            );



        if (file) {

            file.value = "";

        }


    };









    return (


        <div className="resume-page">


            <Sidebar />



            <div className="resume-content">


                <div className="resume-card">



                    <h2>
                        Resume Management
                    </h2>







                    {

                        (role === "HR" ||
                            role === "Manager" ||
                            role === "Employee") &&



                        <form

                            className="resume-form"

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

                                placeholder="Qualification"

                                value={qualification}

                                onChange={(e) =>
                                    setQualification(e.target.value)
                                }

                                required

                            />






                            <input

                                placeholder="Experience"

                                value={experience}

                                onChange={(e) =>
                                    setExperience(e.target.value)
                                }

                                required

                            />






                            <textarea

                                placeholder="Skills"

                                value={skills}

                                onChange={(e) =>
                                    setSkills(e.target.value)
                                }

                                required

                            />







                            {

                                !editId &&


                                <input

                                    id="resumeFile"

                                    type="file"

                                    accept=".pdf"

                                    onChange={(e) =>
                                        setResume(e.target.files[0])
                                    }

                                    required

                                />


                            }







                            <button type="submit">


                                {

                                    editId

                                        ?

                                        "Update Resume"

                                        :

                                        "Upload Resume"

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









                    <table className="resume-table">


                        <thead>


                            <tr>


                                <th>
                                    Employee ID
                                </th>


                                <th>
                                    Qualification
                                </th>


                                <th>
                                    Skills
                                </th>


                                <th>
                                    Experience
                                </th>


                                <th>
                                    Resume
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


                                list.length > 0


                                    ?


                                    list.map((item) => (


                                        <tr key={item.resume_id}>


                                            <td>
                                                {item.employee_id}
                                            </td>



                                            <td>
                                                {item.qualification}
                                            </td>



                                            <td>
                                                {item.skills}
                                            </td>



                                            <td>
                                                {item.experience}
                                            </td>





                                            <td>


                                                <a

                                                    href={`http://127.0.0.1:5000/resume/${item.resume_file}`}

                                                    target="_blank"

                                                    rel="noreferrer"

                                                >

                                                    View PDF

                                                </a>


                                            </td>







                                            {


                                                (role === "HR" ||
                                                    role === "Manager") &&



                                                <td>


                                                    <button

                                                        className="edit-btn"

                                                        type="button"

                                                        onClick={() =>
                                                            editResume(item)
                                                        }

                                                    >

                                                        Edit

                                                    </button>







                                                    <button

                                                        className="delete-btn"

                                                        type="button"

                                                        onClick={() =>
                                                            deleteResume(item.resume_id)
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

                                            No Resume Found

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


export default Resume;