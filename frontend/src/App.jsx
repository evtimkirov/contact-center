import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { logoutUser, getCurrentUser } from "./store/thunks/authThunks";
import AppRoutes from "./routes/AppRoutes";

function AppContent() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <>
            {user && <Navbar user={user} onLogout={() => dispatch(logoutUser())} />}
            <div className="container mt-4">
                <AppRoutes user={user}/>
            </div>
        </>
    );
}

export default AppContent;
