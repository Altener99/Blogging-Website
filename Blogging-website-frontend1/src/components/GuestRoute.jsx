import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { IS_AUTHENTICATED } from "../constraints";

function GuestRoute() {
  
    const isAuth = IS_AUTHENTICATED;
   
   if(isAuth) return <Navigate to="/" />;

   return <Outlet />;
  
}

export default GuestRoute;