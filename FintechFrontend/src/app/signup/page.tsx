import { ModeToggle } from "@/shared/components/ui/mode-toggle";
import CadastrarNovoUsuarioView from "@/ViewModels/CadastrarUsuario/cadastrar-novo-usuario.view";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-sm">
        <CadastrarNovoUsuarioView />
      </div>
    </div>
  );
}
