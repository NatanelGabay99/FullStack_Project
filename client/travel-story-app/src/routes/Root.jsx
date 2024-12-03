import { Navigate } from "react-router-dom";


// define the Root component to handle the initial redirect
const Root = () => {
    // check if the token exists in local storage
    const isAuthenticated = localStorage.getItem('token');
  
    // redirect the dashboard if authenticated, otherwise redirect to login page
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
  }

  export default Root;