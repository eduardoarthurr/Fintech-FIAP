import { UserProps } from "../interfaces/usuario.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
const UsuarioService = () => {
  const listUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deleteUserById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(
          text || `Erro ao deletar usuário (status ${response.status})`
        );
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateUserById = async (data: Omit<UserProps, "senha">) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/usuarios/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { listUsers, getUserById, deleteUserById, updateUserById };
};

export default UsuarioService;
