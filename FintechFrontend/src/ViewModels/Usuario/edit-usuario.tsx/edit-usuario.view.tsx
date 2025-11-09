/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import useUsuarioModel from "../usuario.model";
import { UsuarioIdPageProps } from "@/shared/interfaces/usuario.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const EditUsuarioView = ({ params }: UsuarioIdPageProps) => {
  const {
    triggerGetUserById,
    triggerUpdateUserById,
    triggerDeleteUserById,
    session,
  } = useUsuarioModel({ paramId: params.id });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const queyClient = useQueryClient();

  const router = useRouter();

  const userSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z.string().min(11, "CPF inválido"),
    endereco: z.string().min(1, "Endereço obrigatório"),
    dataNascimento: z.string().min(1, "Data de nascimento obrigatória"),
  });

  type UserForm = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: {
      nome: triggerGetUserById.data?.nome || "",
      email: triggerGetUserById.data?.email || "",
      cpf: triggerGetUserById.data?.cpf || "",
      endereco: triggerGetUserById.data?.endereco || "",
      dataNascimento: triggerGetUserById.data?.dataNascimento || "",
    },
    values: {
      nome: triggerGetUserById.data?.nome || "",
      email: triggerGetUserById.data?.email || "",
      cpf: triggerGetUserById.data?.cpf || "",
      endereco: triggerGetUserById.data?.endereco || "",
      dataNascimento: triggerGetUserById.data?.dataNascimento || "",
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserForm> = async (formData) => {
    const data = {
      id: Number(params.id),
      ...formData,
    };

    triggerUpdateUserById
      .mutateAsync(data)
      .then((res) => {
        toast.success(`Usuário ${res.nome} atualizado com uscesso`);
        queyClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      })
      .catch(() => {
        toast.error("Erro na API. Tente novamente");
      })
      .finally(() => setEditModalOpen(false));
  };

  const handleDelete = async (id: number | string) => {
    try {
      const res = await triggerDeleteUserById.mutateAsync(String(id));

      console.log("rrrr", res);

      setDeleteModalOpen(false);
      toast.success("Usuário deletado com sucesso");

      queyClient.invalidateQueries({ queryKey: ["get-users"] });

      router.push("/usuarios");
    } catch (error: any) {
      console.error("delete error:", error);
      toast.error(error?.message || "Erro na API. Tente novamente");
    }
  };

  if (triggerGetUserById.isLoading) {
    return (
      <div className="flex-1 w-full h-full items-center justify-center flex">
        <Spinner color="gray" />
      </div>
    );
  }

  if (triggerGetUserById.isError) {
    return (
      <div className="flex-1 w-full h-full items-center justify-center flex">
        <div className="flex flex-col items-center gap-2">
          <p
            className="cursor-pointer text-red-500"
            onClick={() => triggerGetUserById.refetch()}
          >
            Tentar Novamente
          </p>
          <RefreshCcw
            className="cursor-pointer"
            onClick={() => triggerGetUserById.refetch()}
            color="gray"
          />
        </div>
      </div>
    );
  }

  if (triggerGetUserById.isSuccess) {
    const user = triggerGetUserById.data;

    return (
      <div className="p-2 flex flex-col gap-4">
        <div
          className="w-20 py-1 rounded flex gap-1 cursor-pointer hover:bg-primary hover:text-secondary"
          onClick={() => router.push("/usuarios")}
        >
          <ChevronLeft />
          Voltar
        </div>
        <div className="border p-2 rounded-md table-auto border-collapse border-muted w-full">
          <div>
            <div className="flex gap-2">
              <small className="px-2 py-1 w-full max-w-28 lg:max-w-42 font-semibold">
                Nome
              </small>
              <small className="px-2 py-1">{user.nome}</small>
            </div>
            <div className="flex gap-2">
              <small className="px-2 py-1 w-full max-w-28 lg:max-w-42 font-semibold">
                Email
              </small>
              <small className="px-2 py-1">{user.email}</small>
            </div>
            <div className="flex gap-2">
              <small className="px-2 py-1 w-full max-w-28 lg:max-w-42 font-semibold">
                CPF
              </small>
              <small className="px-2 py-1">{user.cpf}</small>
            </div>
            <div className="flex gap-2">
              <small className="px-2 py-1 w-full max-w-28 lg:max-w-42 font-semibold">
                Endereço
              </small>
              <small className="px-2 py-1">{user.endereco}</small>
            </div>
            <div className="flex gap-2">
              <small className="px-2 py-1 w-full max-w-28 lg:max-w-42 font-semibold">
                Data Nascimento
              </small>
              <small className="px-2 py-1">{user.dataNascimento}</small>
            </div>
          </div>
          <div className="px-2 py-1 flex justify-end gap-2">
            <Button onClick={() => setEditModalOpen(true)}>Editar</Button>
            {user.email !== session.data?.user?.email && (
              <Button
                variant="destructive"
                onClick={() => setDeleteModalOpen(true)}
              >
                Excluir
              </Button>
            )}
          </div>
        </div>

        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Faça alterações e clique em salvar
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <input
                {...register("nome")}
                placeholder="Nome"
                className="input"
              />
              {errors.nome && (
                <span className="text-red-500">{errors.nome.message}</span>
              )}

              <input
                {...register("email")}
                placeholder="Email"
                className="input"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <input {...register("cpf")} placeholder="CPF" className="input" />
              {errors.cpf && (
                <span className="text-red-500">{errors.cpf.message}</span>
              )}

              <input
                {...register("endereco")}
                placeholder="Endereço"
                className="input"
              />
              <input
                {...register("dataNascimento")}
                placeholder="Data Nascimento"
                className="input"
              />

              <div className="flex gap-2 mt-2">
                <Button
                  type="submit"
                  disabled={triggerUpdateUserById.isPending}
                >
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <p>Tem certeza que deseja excluir o usuário {user.nome}?</p>
            <DialogFooter className="flex gap-2 mt-4">
              <Button
                variant="destructive"
                onClick={() => handleDelete(user.id)}
              >
                Sim
              </Button>
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Não
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
};

export default EditUsuarioView;
