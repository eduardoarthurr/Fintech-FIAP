"use client";

import SignupForm from "@/shared/components/signup-form";
import useCadastrarNovoUsuarioModel from "./cadastrar-novo-usuario.model.view";

const CadastrarNovoUsuarioView = () => {
  const model = useCadastrarNovoUsuarioModel();

  return (
    <SignupForm
      title="Crie sua Conta"
      description="Insira suas informações abaixo para criar sua conta"
      {...model}
    />
  );
};

export default CadastrarNovoUsuarioView;
