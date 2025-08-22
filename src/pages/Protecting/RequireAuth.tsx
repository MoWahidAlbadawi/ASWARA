import { GetCurrentUser } from "@/hooks/users/useUsers";
import { Outlet } from "react-router-dom";
import Cookie from 'cookie-universal'
import Loading from "../Loading/Loading";
import { Navigate } from "react-router-dom";
import Err403 from "../Errors/Err403";
import Err404 from "../Errors/Err404";
import { COOKIE_NAME } from "@/services/endpoints";
interface Props {
    roles : (string | undefined)[]
}

const RequireAuth = ({ roles }: Props) => {
    const cookies = Cookie();
    const token = cookies.get(COOKIE_NAME);

    // No token go to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Get user
    const { data : currentUser, isLoading, error } = GetCurrentUser();


    if (isLoading) {
        return <Loading />;
    }

    // Handle errors 
    if (error) {
        return <Navigate to="/login" replace/>; 
    }

    if(currentUser?.userType == 'user') {
        return <Err404 />
    }

    // Check permissions
    if (!roles.includes(currentUser?.userType)) {
        return <Err403 />; // User exists but lacks role
    }

    // All good , go to destination
    return <Outlet />;
};
export default RequireAuth;