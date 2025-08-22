import { GetCurrentUser } from "@/hooks/users/useUsers";
import { Typography , Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
const Err404 = () => {
    const { data : currentUser } = GetCurrentUser();
    const goToHomePage = currentUser?.userType === 'admin' ? '/home' : '/categories';
    return <Box textAlign={'center'} mt={5}>
        <Typography color="primary" fontWeight={'bold'} fontSize={75}>404</Typography>
        <Typography color="primary.dark" fontWeight={'bold'} fontSize={30} mt={-2}>Oops! You seem to be lost</Typography>
        <Typography color="primary">The page you're looking for doesn't exist or has been moved.</Typography>
        <Button variant='contained' color="secondary" className="!mt-5">
        <Link to={goToHomePage}>Back To Home</Link>
        </Button>
    </Box>
}
export default Err404;