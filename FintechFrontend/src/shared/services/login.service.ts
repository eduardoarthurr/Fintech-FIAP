import { IFormInput } from "../interfaces/login.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AuthService = () => {
  const signIn = async (data: IFormInput) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          senha: data.password,
        }),
      });

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async (data: any) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/usuarios/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return { signUp, signIn };
};

export default AuthService;
