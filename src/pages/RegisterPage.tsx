import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/images.jpg";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className="w-1/2">
      <div className="flex gap-1">
        <img loading="lazy" className="w-5 h-5" src={Logo} />
        <span>Guidnace</span>
      </div>
      <div className="flex gap-4 px-20 min-h-screen flex-col justify-center">
        <Input type="text" placeholder="First name" />
        <Input type="text" placeholder="Last name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="hover:text-base animation delay-300">
          Register
        </Button>
      </div>
    </div>
  );
}
