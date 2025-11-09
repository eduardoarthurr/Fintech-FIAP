"use client";

import { useState, useEffect } from "react";
import {
  Categoria,
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
} from "@/shared/services/categoria.service";

export default function useCategoriaModel() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"Renda" | "Despesa">("Renda");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCategorias = async () => {
    try {
      return await getCategorias();
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
      return [];
    }
  };

  const saveCategoria = async () => {
    if (!nome) return alert("Preencha o nome da categoria");

    try {
      if (editId !== null) {
        const updated = await updateCategoria(editId, {
          id: editId,
          nome,
          tipo,
        });
        setCategorias(categorias.map((c) => (c.id === editId ? updated : c)));
        setEditId(null);
      } else {
        const created = await addCategoria({ nome, tipo });
        setCategorias([...categorias, created]);
      }

      setNome("");
      setTipo("Renda");
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
    }
  };

  const editCategoria = (categoria: Categoria) => {
    setEditId(categoria.id ?? null);
    setNome(categoria.nome);
    setTipo(categoria.tipo as "Renda" | "Despesa");
  };

  const removeCategoria = async (id?: number) => {
    console.log(id);
    if (!id) return;
    if (!confirm("Deseja realmente excluir esta categoria?")) return;

    try {
      await deleteCategoria(id);
      setCategorias(categorias.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao deletar categoria:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCategorias = async () => {
      const data = await fetchCategorias();
      if (isMounted) {
        setCategorias(data);
      }
    };

    loadCategorias();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    categorias,
    nome,
    tipo,
    editId,
    setNome,
    setTipo,
    saveCategoria,
    editCategoria,
    removeCategoria,
  };
}
