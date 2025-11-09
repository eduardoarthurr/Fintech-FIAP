"use client";

import SignupForm from "@/shared/components/signup-form";
import useNovoUsuarioModel from "./novo-usuario.model";

const NovoUsuarioView = () => {
  const model = useNovoUsuarioModel();
  return (
    <div className="w-full  flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm
          title="Criar novo Usuário"
          description="Um novo usuário para ter acesso a uma conta"
          noCard={false}
          {...model}
        />
      </div>
    </div>
  );
};

export default NovoUsuarioView;
