import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import toast from "react-hot-toast";

const Home = () => {
    const cookies = Cookie();
    const token = cookies.get('aswara');
    const navigate = useNavigate();

    function navigateToLogin () {
        if(token) {
            toast.error('you are already logged in');
            return;
        }
        else {
            navigate('/login');
        }
    }

    function navigateToDashboard () {
        if(!token) {
            toast.error('you must login first!');
            return;
        }
        else {
            navigate('/aswaraDashboard/home');
        }
    }


    return <div className="flex flex-col gap-5 justify-center items-center !mt-12">
        <Typography component={'h2'} className="!text-2xl text-primary-dark">Welcome to the ASWARA</Typography>
        <Typography className="!text-xl text-secondary-main">Wahid makes it now</Typography>
        <div className="flex flex-col gap-5 !mt-3">
        <Button variant="contained" className="!text-white" sx={{textTransform : 'none'}}
        onClick={navigateToLogin}>
            Go To Login
        </Button>
        <Button variant="contained" className="!text-white" sx={{textTransform : 'none'}}
        onClick={navigateToDashboard}>
            Go To Dashboard
        </Button>
        </div>
        </div>
}
export default Home;