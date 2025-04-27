import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/assets/images.jpg";

export default function LoginPage() {
  return (
    <div className="w-1/2">
      <div className="flex gap-1">
        <img loading="lazy" className="w-5 h-5" src={Logo} />
        <span>Guidnace</span>
      </div>
      <div className="flex gap-4 px-20 min-h-screen flex-col justify-center">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <div className="flex gap-2 items-center">
          <Checkbox />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button className="hover:text-base animation delay-300">Login</Button>
      </div>
    </div>
  );
}
