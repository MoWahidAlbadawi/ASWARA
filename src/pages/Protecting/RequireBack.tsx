import { Outlet, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import { useEffect } from "react";

const RequireBack = () => {
    const cookies = Cookie();
    const navigate = useNavigate();
    const token = cookies.get('jewelry-store');

    // 1. token exist , still when you are
    useEffect(() => {
    if (token) {
        navigate(-1);
        return; 
    }
    },[token])
    // 5. All good so render
    return !token ? <Outlet /> : null;
};
export default RequireBack;