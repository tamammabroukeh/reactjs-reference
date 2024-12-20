import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootBoundary from "../pages/errors/RootBoundary";
import Layout from "../pages/errors/website/Layout";
import Register from "../components/forms/Register";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RootBoundary />}>
      <Route index element={<div>Home</div>} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<>404</>} />
    </Route>
  )
);
export default router;
