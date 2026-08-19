import Sidebar from "../components/Sidebar";

import "../css/profile.css";


function Profile() {


    const username = 
        localStorage.getItem("username");


    const email = 
        localStorage.getItem("email");


    const role = 
        localStorage.getItem("role");

    const employee_id = 
        localStorage.getItem("employee_id");



    return (


        <div className="profile-page">


            <Sidebar />



            <div className="profile-content">



                <div className="profile-card">

                    <div className="profile-header">

                        <div className="profile-avatar">

                            👤

                        </div>

                        <h2>

                            {username}

                        </h2>

                        <p>

                            {role}

                        </p>

                    </div>

                    <div className="profile-details">

                        <div className="profile-box">

                            <h4>📧 Email</h4>

                            <p>

                                {email}

                            </p>

                        </div>

                        <div className="profile-box">

                            <h4>💼 Role</h4>

                            <p>

                                {role}

                            </p>

                        </div>

                        {employee_id && (

                            <div className="profile-box">

                                <h4>🆔 Employee ID</h4>

                                <p>

                                    {employee_id}

                                </p>

                            </div>

                        )}

                        <div className="profile-box">

                            <h4>📅 Member Since</h4>

                            <p>

                                {new Date().getFullYear()}

                            </p>

                        </div>

                    </div>

                </div>



            </div>



        </div>


    );


}


export default Profile;