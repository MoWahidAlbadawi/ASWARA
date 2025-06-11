import api from "@/services/axios";
import { LOGOUT } from "@/services/endpoints";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
const Logout = () => {
    const navigate = useNavigate();
    const cookies = Cookie();
    async function logout () {
        await api.post(`${LOGOUT}`);
        cookies.remove('aswara');
        navigate('/');
    }
    return <Button variant="contained" onClick={logout}>
        <p className="text-white capitalize">Logout</p>
    </Button>
}
export default Logout;