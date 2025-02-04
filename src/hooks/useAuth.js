import { useSelector } from "react-redux";

export default function useAuth() {
    const auth = useSelector(states => states.auth)

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false
    }
}