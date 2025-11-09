"use client";

import { SignupFormSchema } from "@/shared/interfaces/usuario.interface";
import AuthService from "@/shared/services/login.service";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const useCadastrarNovoUsuarioModel = () => {
  const { signUp, signIn: login } = AuthService();

  const router = useRouter();

  const triggerSignUp = useMutation({
    mutationFn: signUp,
  });

  const onSubmit: SubmitHandler<SignupFormSchema> = async (data) => {
    const payload = {
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      email: data.email,
      endereco: data.endereco,
      nome: data.nome,
      senha: data.senha,
    };

    await triggerSignUp.mutateAsync(payload, {
      onError(error) {
        console.error(error.message);
        toast.error(`Usuário com email: ${payload.email} já existe`);
      },
      onSuccess(data) {
        toast.success(`Usuário: ${data.email} criado com sucesso`);
        async function Log() {
          const logado = await login({
            email: payload.email,
            password: payload.senha,
          });

          await signIn("credentials", {
            token: logado.token,
            redirect: true,
            redirectTo: "/usuarios",
          });
        }
        Log();
      },
    });
  };

  return { onSubmit, triggerSignUp };
};

export default useCadastrarNovoUsuarioModel;
