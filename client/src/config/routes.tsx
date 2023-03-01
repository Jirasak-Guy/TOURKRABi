import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Tourreview from "../pages/TourReview";
import Tour from "../pages/Tours";
import Profilepage from "../pages/Profile";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="onedaytrip" element={<Tour />} />
            <Route path="packagetrip" element={<Tour />} />
            <Route path="tour/:id" element={<Tourreview />} />
            <Route path="profile" element={<Profilepage />} />
        </Routes>
    );
};

export default AppRoutes;