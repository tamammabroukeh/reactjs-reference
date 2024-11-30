import { createUserWithEmailAndPassword } from "firebase/auth";
import { RegisterSchema, RegisterType } from "../schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<RegisterType>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const submitHandler: SubmitHandler<RegisterType> = async (data) => {
    setIsLoading(true);
    console.log(data);
    const { email, password, firstname, lastname } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          firstName: firstname,
          lastName: lastname,
          email: user.email,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!");
      navigate("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitHandler,
    form,
    isLoading,
  };
};

export default useRegister;
