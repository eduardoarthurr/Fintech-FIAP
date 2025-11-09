import { LoginForm } from "@/shared/components/login-form";
import { ModeToggle } from "@/shared/components/ui/mode-toggle";
import useLoginModel from "./login.model";
import { useSession } from "next-auth/react";

const LoginView = () => {
  const { onSubmit } = useLoginModel();

  const session = useSession();

  console.log(session);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default LoginView;
