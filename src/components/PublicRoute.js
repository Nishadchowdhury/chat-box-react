import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PublicRoute({ children }) {
    const isLoggedIn = useAuth();

    if (!isLoggedIn) {
        return <>{children}</>
    } else {
        return <Navigate to={'/inbox'} />
    }
}

export default PublicRoute;