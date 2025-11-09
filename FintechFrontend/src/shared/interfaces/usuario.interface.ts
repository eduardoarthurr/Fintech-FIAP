import z from "zod";

export interface UsuarioIdPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface UserProps {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  endereco: string;
  dataNascimento: string;
}

const cpfDigitsRegex = /^[0-9]{11}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const preprocessCPF = (val: unknown) => {
  if (typeof val !== "string") return val;
  return val.replace(/\D/g, "");
};

export const signupSchema = z
  .object({
    nome: z
      .string()
      .min(5, "Digite nome e sobrenome (mínimo 2 caracteres cada)")
      .refine((s) => {
        const parts = String(s).trim().split(/\s+/);
        if (parts.length < 2) return false;
        return parts.every((p) => p.length >= 2);
      }, "Forneça nome e sobrenome (mínimo 2 caracteres em cada)"),
    email: z.string().email("Email inválido"),
    senha: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[0-9]/, "A senha precisa conter pelo menos um número")
      .regex(/[A-Z]/, "A senha precisa conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha precisa conter ao menos uma letra minúscula"),
    confirmSenha: z.string(),
    cpf: z
      .preprocess(preprocessCPF, z.string())
      .refine((v) => cpfDigitsRegex.test(String(v)), {
        message: "CPF inválido (11 dígitos numéricos)",
      }),
    endereco: z.string().min(5, "Endereço incompleto"),
    dataNascimento: z
      .string()
      .regex(dateRegex, "Formato de data inválido (use DD-MM-AA)")
      .refine((d) => {
        const date = new Date(d);
        return !Number.isNaN(date.getTime());
      }, "Data de nascimento inválida"),
  })
  .refine((data) => data.senha === data.confirmSenha, {
    message: "As senhas não conferem",
    path: ["confirmSenha"],
  });

export type SignupFormSchema = z.infer<typeof signupSchema>;
