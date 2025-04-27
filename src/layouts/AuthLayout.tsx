import { Link, Outlet, useLocation } from "react-router";
import Classroom from "@/assets/Classroom-pana.svg";
import Logo from "@/assets/images.jpg";
import AuthPromoLayout from "./AuthPromoLayout";
export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");
  return (
    <div className={`flex ${!isLoginPage && "flex-row-reverse"}`}>
      {/* <div
        className={`float-${isLoginPage ? "left" : "right"} w-1/2 bg-gray-700`}
      >
        <div className="flex flex-col gap-10 items-center">
          <div className="flex flex-col gap-5 items-center">
            <img loading="lazy" className="w-fit h-20" src={Logo} />
            <p className="w-[70%] text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repellat, voluptate. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Repellat, voluptate.
            </p>
            <h3>dont have an account? create new one</h3>
            <Link
              className="bg-pink-500 rounded-lg py-2 px-3"
              to={`${isLoginPage ? "/auth/register" : "/auth/login"}`}
            >
              {isLoginPage ? "sign up" : "Login"}
            </Link>
          </div>
          <img loading="lazy" className="" src={Classroom} />
        </div>
      </div> */}
      <AuthPromoLayout {...{ isLoginPage }} />
      <Outlet />
    </div>
  );
}
