"use client";

import React, { useState } from "react";
import useOrcamentoModel, { Orcamento } from "./orcamento.model";
import { Spinner } from "@/shared/components/ui/spinner";

export default function OrcamentoView() {
  const {
    orcamentos,
    categorias,
    criarOrcamento,
    editarOrcamento,
    removerOrcamento,
    loading,
    session,
    status,
  } = useOrcamentoModel();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | "">(
    ""
  );
  const [novoValor, setNovoValor] = useState("");
  const [novoTipo, setNovoTipo] = useState<"Renda" | "Despesa">("Renda");
  const [editId, setEditId] = useState<number | null>(null);

  // enquanto session não carrega, mostra spinner
  if (status === "loading") {
    return (
      <div className="flex-1 w-full h-screen items-center justify-center flex">
        <Spinner color="gray" />
      </div>
    );
  }

  // se não estiver autenticado, não renderiza nada
  if (!session) return null;

  const handleSalvar = async () => {
    if (!categoriaSelecionada || !novoValor)
      return alert("Preencha todos os campos");

    const categoria = categorias.find((c) => c.id === categoriaSelecionada);
    if (!categoria) return alert("Categoria inválida");

    const valorNum = parseFloat(novoValor);
    if (isNaN(valorNum)) return alert("Valor inválido");

    const agora = new Date();
    const orcamento: Orcamento = {
      valorLimite: valorNum,
      tipo: novoTipo,
      categoria: categoria,
      categoriaId: categoria.id,
      mes: agora.getMonth() + 1,
      ano: agora.getFullYear(),
    };

    try {
      if (editId) {
        await editarOrcamento(editId, orcamento);
        setEditId(null);
      } else {
        await criarOrcamento(orcamento);
      }
      setCategoriaSelecionada("");
      setNovoValor("");
      setNovoTipo("Renda");
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar orçamento!");
    }
  };

  const userId = session?.user?.id;

  const meusOrcamentos = orcamentos.filter(
    (o) => String(o.usuarioId) === String(userId)
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Orçamento</h1>

      {loading && <p>Carregando...</p>}

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-secondary text-left">
            <th className="p-3">Categoria</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Valor</th>
            <th className="p-3 text-end pr-13">Ações</th>
          </tr>
        </thead>
        <tbody>
          {meusOrcamentos.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Nenhum orçamento cadastrado.
              </td>
            </tr>
          ) : (
            meusOrcamentos.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {categorias.find((c) => c.id === o.categoriaId)?.nome || "-"}
                </td>
                <td className="p-3">
                  {categorias.find((c) => c.id === o.categoriaId)?.tipo || "-"}
                </td>
                <td
                  className={`p-3 ${
                    categorias.find((c) => c.id === o.categoriaId)?.tipo ===
                    "Despesa"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  R${" "}
                  {typeof o.valorLimite === "number"
                    ? o.valorLimite.toFixed(2)
                    : "0.00"}
                </td>
                <td className="p-3 flex gap-2 flex-end justify-end">
                  <button
                    onClick={() => {
                      setEditId(o.id ?? null);
                      setCategoriaSelecionada(
                        o.categoriaId ?? o.categoria?.id ?? ""
                      );
                      setNovoValor((o.valorLimite ?? 0).toString());
                      setNovoTipo((o.tipo as "Renda" | "Despesa") ?? "Renda");
                    }}
                    className="bg-yellow-400 px-2 py-1 rounded text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => o.id && removerOrcamento(o.id)}
                    className="bg-red-600 px-2 py-1 rounded text-white"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex gap-4 items-end">
        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Valor"
          value={novoValor}
          onChange={(e) => setNovoValor(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select
          value={novoTipo}
          onChange={(e) => setNovoTipo(e.target.value as "Renda" | "Despesa")}
          className="border p-2 rounded w-1/3"
        >
          <option value="Renda">Renda</option>
          <option value="Despesa">Despesa</option>
        </select>

        <button
          onClick={handleSalvar}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
        >
          {editId ? "Atualizar" : "+ Adicionar"}
        </button>
      </div>
    </div>
  );
}
