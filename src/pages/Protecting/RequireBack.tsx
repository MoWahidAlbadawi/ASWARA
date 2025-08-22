import { Outlet, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import { useEffect } from "react";
import { COOKIE_NAME } from "@/services/endpoints";

const RequireBack = () => {
    const cookies = Cookie();
    const navigate = useNavigate();
    const token = cookies.get(COOKIE_NAME);

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