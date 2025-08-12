import { Typography , Box , Button } from "@mui/material";
import { Link } from "react-router-dom";
const Err403 = () => {
    return <Box textAlign={'center'} mt={5}>
        <Typography color="primary" fontWeight={'bold'} fontSize={75}>403</Typography>
        <Typography color="primary.dark" fontWeight={'bold'} fontSize={30} mt={-2}>Access Forbidden</Typography>
        <Typography color="primary">Oops you don't have permission to access this page</Typography>
    <Button variant='contained' color="secondary" className="!mt-5">
        <Link to='/home'>Back To Home</Link>
        </Button>
    </Box>
}
export default Err403;