/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  getOrcamentos,
  addOrcamento,
  updateOrcamento,
  deleteOrcamento,
} from "@/shared/services/orcamento.service";

export interface Categoria {
  id: number;
  nome: string;
  tipo?: string;
}

export interface Orcamento {
  id?: number;
  categoriaId?: number;
  usuarioId?: string;
  categoria?: Categoria;
  valorLimite?: number;
  valor?: number;
  tipo?: "Renda" | "Despesa";
  mes?: number;
  ano?: number;
}

export default function useOrcamentoModel() {
  const { data: session, status } = useSession();
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    } else {
      // limpar quando deslogado
      setOrcamentos([]);
      setCategorias([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function fetchData() {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const data = await getOrcamentos();
      // normaliza valorLimite para number e garante campo categoriaId quando possível
      const normalized = Array.isArray(data)
        ? data.map((o: any) => ({
            ...o,
            valorLimite: Number(o.valorLimite ?? o.valor ?? 0),
            categoriaId: o.categoriaId ?? o.categoria?.id,
            tipo: o.tipo ?? o.tipo, // mantém se existir
          }))
        : [];

      setOrcamentos(normalized);

      const categoriasData = await fetch("http://localhost:8080/api/categorias")
        .then(async (res) => {
          try {
            const json = await res.json();
            return Array.isArray(json) ? json : [];
          } catch {
            return [];
          }
        })
        .catch(() => []);
      setCategorias(categoriasData);
    } catch (err) {
      console.error("Erro ao buscar orçamentos:", err);
      setCategorias([]);
      setOrcamentos([]);
    } finally {
      setLoading(false);
    }
  }

  async function criarOrcamento(novo: Orcamento) {
    if (!session?.user?.id) return;

    const agora = new Date();
    const mes = novo.mes ?? agora.getMonth() + 1;
    const ano = novo.ano ?? agora.getFullYear();

    const payload = {
      ano: String(ano),
      mes: String(mes),
      valorLimite: novo.valorLimite ?? novo.valor ?? 0,
      tipo: novo.tipo ?? "Renda",
      usuarioId: session.user.id,
      categoriaId: novo.categoria?.id ?? novo.categoriaId,
    };

    console.log("JSON enviado ao backend (criar):", payload);

    const criado = await addOrcamento(payload);
    // normalize created and append
    const createdNorm = {
      ...criado,
      valorLimite: Number(criado.valorLimite ?? criado.valor ?? 0),
      categoriaId: criado.categoriaId ?? criado.categoria?.id,
    };
    setOrcamentos((prev) => [...prev, createdNorm]);
  }

  async function editarOrcamento(id: number, dados: Orcamento) {
    if (!session?.user?.id) return;

    const agora = new Date();
    const mes = dados.mes ?? agora.getMonth() + 1;
    const ano = dados.ano ?? agora.getFullYear();

    const payload = {
      ano: String(ano),
      mes: String(mes),
      valorLimite: dados.valorLimite ?? dados.valor ?? 0,
      tipo: dados.tipo ?? "Renda",
      usuarioId: session.user.id,
      categoriaId: dados.categoria?.id ?? dados.categoriaId,
    };

    console.log("JSON enviado ao backend (editar):", payload);

    const atualizado = await updateOrcamento(id, payload);
    const updatedNorm = {
      ...atualizado,
      valorLimite: Number(atualizado.valorLimite ?? atualizado.valor ?? 0),
      categoriaId: atualizado.categoriaId ?? atualizado.categoria?.id,
    };
    setOrcamentos((prev) => prev.map((o) => (o.id === id ? updatedNorm : o)));
  }

  async function removerOrcamento(id: number) {
    await deleteOrcamento(id);
    setOrcamentos((prev) => prev.filter((o) => o.id !== id));
  }

  return {
    orcamentos,
    categorias,
    loading,
    fetchData,
    criarOrcamento,
    editarOrcamento,
    removerOrcamento,
    session,
    status,
  };
}
