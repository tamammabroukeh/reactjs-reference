import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootBoundary from "../pages/errors/RootBoundary";
import Layout from "../pages/errors/website/Layout";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<RootBoundary />}>
            <Route index element={<div>Home</div>} />
            <Route path="*" element={<>404</>} />
        </Route>
    )
);
export default router;
