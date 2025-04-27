import { Link, useLocation, useNavigate } from "react-router";
import RegisterPromoImg from "@/assets/Mobile Marketing-bro.svg";
import LoginPromoImg from "@/assets/Classroom-pana.svg";
import Logo from "@/assets/images.jpg";
import {
  doHaveAnAccount,
  dontHaveAnAccount,
  loginDescription,
  registerDescription,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function AuthPromoLayout({
  isLoginPage,
}: {
  isLoginPage: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div className={`w-1/2 bg-gray-700`}>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-5 items-center">
          <img loading="lazy" className="w-fit h-20" src={Logo} />
          <p className="w-[70%] text-center">
            {isLoginPage ? loginDescription : registerDescription}
          </p>
          <h3>{isLoginPage ? dontHaveAnAccount : doHaveAnAccount}</h3>
          <Button
            className={`${
              isLoginPage ? "slide-in-right" : "slide-in-left"
            } hover:text-base animation delay-300 bg-pink-500`}
            onClick={() =>
              navigate(isLoginPage ? "/auth/register" : "/auth/login")
            }
          >
            {isLoginPage ? "sign up" : "Login"}
          </Button>
        </div>
        <img
          loading="lazy"
          className=""
          src={isLoginPage ? LoginPromoImg : RegisterPromoImg}
        />
      </div>
    </div>
  );
}
