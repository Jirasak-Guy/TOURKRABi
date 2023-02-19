import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import OneDayTrip from "../pages/OneDayTrip"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="onedaytrip" element={<OneDayTrip />} />
        </Routes>
    );
};

export default AppRoutes;