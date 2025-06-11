import { getCurrentUser } from "@/hooks/users/useUser";
import { Outlet } from "react-router-dom";
import Cookie from 'cookie-universal'
import Loading from "../Loading/Loading";
import { Navigate } from "react-router-dom";
import Err403 from "../Errors/Err403";
import Err404 from "../Errors/Err404";
interface Props {
    roles : (string | undefined)[]
}

const RequireAuth = ({ roles }: Props) => {
    const cookies = Cookie();
    const token = cookies.get('aswara');

    // 1. No token go to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // // 2. Fetch user
    const { data : currentUser, isLoading, error } = getCurrentUser();


    if (isLoading) {
        return <Loading />;
    }

    // // 3. Handle errors 
    if (error) {
        return <Navigate to="/login" replace/>; 
    }

    if(currentUser?.userType == 'user') {
        return <Err404 />
    }

    // // 4. Check permissions
    if (!roles.includes(currentUser?.userType)) {
        return <Err403 />; // User exists but lacks role
    }

    // 5. All good so render
    return <Outlet />;
};
export default RequireAuth;