/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserProps } from "@/shared/interfaces/usuario.interface";
import UsuarioService from "@/shared/services/usuario.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useUsuarioModel = ({ paramId }: { paramId?: string }) => {
  const { listUsers, getUserById, deleteUserById, updateUserById } =
    UsuarioService();

  const session = useSession();

  const triggerListUsers = useQuery<UserProps[], any>({
    queryKey: ["get-users"],
    queryFn: () => listUsers(),
    enabled: !paramId,
  });

  const triggerGetUserById = useQuery<UserProps, any>({
    queryKey: ["get-user-by-id", paramId],
    queryFn: () => getUserById(paramId!),
    enabled: !!paramId,
  });

  const triggerDeleteUserById = useMutation({
    mutationKey: ["delete-user-by-id"],
    mutationFn: deleteUserById,
  });

  const triggerUpdateUserById = useMutation({
    mutationKey: ["update-user-by-id"],
    mutationFn: updateUserById,
  });

  return {
    triggerListUsers,
    triggerGetUserById,
    triggerDeleteUserById,
    triggerUpdateUserById,
    session,
  };
};

export default useUsuarioModel;
