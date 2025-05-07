import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootBoundary from "../pages/errors/RootBoundary";
import Layout from "../pages/errors/website/Layout";
import Register from "../components/forms/Register";
import Steps from "@/components/Steps";
import MultiStepForm from "@/pages/MultiStepForm";
import MultiStepFormPage75 from "@/pages/MultiStepFormPage75";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RootBoundary />}>
      <Route index element={<div>Home</div>} />
      <Route path="register" element={<Register />} />
      <Route path="multi-register" element={<Steps />} />
      <Route path="/multi-step-form" element={<MultiStepForm />} />
      <Route path="/multi-step-form-75" element={<MultiStepFormPage75 />} />
      <Route path="*" element={<>404</>} />
    </Route>
  )
);
export default router;
