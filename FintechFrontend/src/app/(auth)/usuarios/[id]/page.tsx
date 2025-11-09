import { UsuarioIdPageProps } from "@/shared/interfaces/usuario.interface";
import EditUsuarioView from "@/ViewModels/Usuario/edit-usuario.tsx/edit-usuario.view";

const UsuarioIdPage = async ({ params }: UsuarioIdPageProps) => {
  const params2 = await params;

  return <EditUsuarioView params={params2} />;
};

export default UsuarioIdPage;
