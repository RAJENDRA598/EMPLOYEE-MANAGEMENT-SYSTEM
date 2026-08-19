import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import Profile from "./pages/Profile";

import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";
import Resume from "./pages/Resume";
import Performance from "./pages/Performance";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {


    return (

        <Routes>


            {/* Public Pages */}

            <Route 
                path="/" 
                element={<Home />} 
            />


            <Route 
                path="/login" 
                element={<Login />} 
            />


            <Route 
                path="/register" 
                element={<Register />} 
            />

            <Route 
                path="/forgot-password" 
                element={<ForgotPassword />} 
            />





            {/* Dashboard */}

            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>

                }

            />






            {/* Employee Management */}


            <Route

                path="/employees"

                element={

                    <ProtectedRoute>

                        <EmployeeList />

                    </ProtectedRoute>

                }

            />




            <Route

                path="/add-employee"

                element={

                    <ProtectedRoute>

                        <AddEmployee />

                    </ProtectedRoute>

                }

            />




            <Route

                path="/edit-employee/:id"

                element={

                    <ProtectedRoute>

                        <EditEmployee />

                    </ProtectedRoute>

                }

            />







            {/* User Profile */}


            <Route

                path="/profile"

                element={

                    <ProtectedRoute>

                        <Profile />

                    </ProtectedRoute>

                }

            />










            {/* Leave Management */}


            <Route

                path="/leave"

                element={

                    <ProtectedRoute>

                        <Leave />

                    </ProtectedRoute>

                }

            />








            {/* Attendance Management */}


            <Route

                path="/attendance"

                element={

                    <ProtectedRoute>

                        <Attendance />

                    </ProtectedRoute>

                }

            />








            {/* Resume Management */}


            <Route

                path="/resume"

                element={

                    <ProtectedRoute>

                        <Resume />

                    </ProtectedRoute>

                }

            />








            {/* Performance Management */}


            <Route

                path="/performance"

                element={

                    <ProtectedRoute>

                        <Performance />

                    </ProtectedRoute>

                }

            />





        </Routes>

    );

}


export default App;