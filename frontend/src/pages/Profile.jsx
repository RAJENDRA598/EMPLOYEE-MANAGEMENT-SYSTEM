import Sidebar from "../components/Sidebar";

import "../css/profile.css";


function Profile() {


    const username = 
        localStorage.getItem("username");


    const email = 
        localStorage.getItem("email");


    const role = 
        localStorage.getItem("role");



    return (


        <div className="profile-page">


            <Sidebar />



            <div className="profile-content">



                <div className="profile-card">





                    <div className="profile-avatar">

                        👤

                    </div>





                    <h2>

                        {username}

                    </h2>





                    <div className="profile-box">


                        <h4>

                            📧 Email

                        </h4>


                        <p>

                            {email}

                        </p>


                    </div>








                    <div className="profile-box">


                        <h4>

                            💼 Role

                        </h4>


                        <p>

                            {role}

                        </p>


                    </div>






                </div>



            </div>



        </div>


    );


}


export default Profile;