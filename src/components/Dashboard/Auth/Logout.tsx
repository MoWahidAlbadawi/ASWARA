import api from "@/services/axios";
import { LOGOUT } from "@/services/endpoints";
import { Button, Typography , Icon} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import { AiOutlineLogout } from "react-icons/ai";
const Logout = () => {
    const navigate = useNavigate(); 
    const cookies = Cookie();
    async function logout () {
        await api.post(`${LOGOUT}`);
        cookies.remove('aswara');
        navigate('/');
    }
    return <Button onClick={logout} color="error" sx={{textTransform : 'capitalize' , display : 'flex' , gap : '5px'}}>
        <Icon><AiOutlineLogout /></Icon>
        <Typography>Logout</Typography>
    </Button>
}
export default Logout;