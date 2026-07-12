import { Link, useNavigate } from "react-router-dom";

import "../css/layout.css";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        navigate("/login");

    };

    const canManageEmployees =
        role === "HR" || role === "Manager";

    const canAccessResume =
        role === "HR" ||
        role === "Manager" ||
        role === "Employee";

    const canAccessPerformance =
        role === "HR" || role === "Manager";

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>EMS</h2>

                <p>{role} Panel</p>

            </div>

            <nav className="sidebar-menu">

                <Link to="/dashboard">
                    🏠 Dashboard
                </Link>

                <Link to="/employees">
                    👥 Employees
                </Link>

                <Link to="/profile">
                    👤 Profile
                </Link>

                <Link to="/change-password">
                    🔒 Change Password
                </Link>

                <Link to="/leave">
                    📅 Leave
                </Link>

                <Link to="/attendance">
                    🕒 Attendance
                </Link>

                {canAccessResume && (
                    <Link to="/resume">
                        📄 Resume
                    </Link>
                )}

                {canAccessPerformance && (
                    <Link to="/performance">
                        📈 Performance
                    </Link>
                )}

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </aside>

    );

}

export default Sidebar;