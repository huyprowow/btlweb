import React from 'react'
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token1");
        localStorage.removeItem("userInformation");
        navigate("/login");
    }
    return (
        <>
            <div>DashboardPage</div>
            <button
                onClick={handleLogout}
            >logout</button>
        </>
    )

}

export default DashboardPage