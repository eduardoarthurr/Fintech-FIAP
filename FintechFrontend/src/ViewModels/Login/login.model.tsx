import { IFormInput } from "@/shared/interfaces/login.interface";
import AuthService from "@/shared/services/login.service";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";

const useLoginModel = () => {
  const { signIn: login } = AuthService();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const logado = await login(data);
    console.log("logado", logado);
    if (logado?.token) {
      const res = await signIn("credentials", {
        token: logado.token,
        redirect: true,
        redirectTo: "/usuarios",
      });
      console.log("res", res);
    } else {
      console.error("Resposta do backend sem token");
    }
  };

  return { onSubmit };
};

export default useLoginModel;
