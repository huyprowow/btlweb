import { useNavigate } from 'react-router-dom';
const AdminPage = () => {
    const navigate = useNavigate()
    const goToDashBoard = () => {
        navigate("/dashboard");
    }
    return (
        <>
            <div>AdminPage</div>
            <button
                onClick={goToDashBoard}
            >logout</button>
        </>
    )

}

export default AdminPage