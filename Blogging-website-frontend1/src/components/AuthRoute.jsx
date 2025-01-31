import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IS_AUTHENTICATED } from "../constraints";

function AuthRoute() {
  
    const isAuth = IS_AUTHENTICATED;


    if(isAuth) return <Navigate to="/"/>
    

    return <Outlet />;
}

export default AuthRoute;