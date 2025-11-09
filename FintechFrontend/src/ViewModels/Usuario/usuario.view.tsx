"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import useUsuarioModel from "./usuario.model";
import Link from "next/link";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

const UsuarioView = () => {
  const { triggerListUsers, session } = useUsuarioModel({});

  if (triggerListUsers.isLoading) {
    return (
      <div className="flex-1 w-full h-screen items-center justify-center flex">
        <Spinner color="gray" />
      </div>
    );
  }

  if (triggerListUsers.isError) {
    return (
      <div className="flex-1 w-full h-screen items-center justify-center flex">
        <Spinner color="gray" />
      </div>
    );
  }

  if (triggerListUsers.isSuccess) {
    return (
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex gap-4 justify-between">
          <h2>Lista de Usuários</h2>
          <Link
            href="/usuarios/novo"
            className="h-5 w-auto bg-blue-400 py-4 px-2 rounded-md text-white hover:bg-blue-400/70 cursor-pointer flex items-center justify-center"
          >
            + Novo Usuário
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {triggerListUsers.data.length > 0 ? (
            triggerListUsers.data.map((u: any) => (
              <div
                className={cn(
                  "border-b border-t p-2 hover:bg-muted flex justify-between items-center"
                )}
                key={u.id}
              >
                <div className="flex gap-2">
                  {u.nome}{" "}
                  {u.email === session.data?.user?.email && (
                    <small className="bg-primary text-secondary flex items-center px-2 rounded text-[10px]">
                      USUÁRIO LOGADO
                    </small>
                  )}
                </div>

                <Link className="cursor-pointer" href={`/usuarios/${u.id}`}>
                  <Button className="cursor-pointer">Ver usuário</Button>
                </Link>
              </div>
            ))
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-screen items-center justify-center flex">
      <Spinner color="gray" />
    </div>
  );
};

export default UsuarioView;
