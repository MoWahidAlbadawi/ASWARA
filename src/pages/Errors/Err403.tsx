import { Typography , Box } from "@mui/material";
const Err403 = () => {
    return <Box textAlign={'center'} mt={5}>
        <Typography color="primary" fontWeight={'bold'} fontSize={75}>403</Typography>
        <Typography color="primary.dark" fontWeight={'bold'} fontSize={30} mt={-2}>Access Forbidden</Typography>
        <Typography color="primary">Oops you don't have permission to access this page</Typography>
    </Box>
}
export default Err403;