"use client";

import { useState, useEffect } from "react";
import useCategoriaModel from "./categoria.model";

const CategoriaView = () => {
  const {
    categorias,
    nome,
    tipo,
    editId,
    setNome,
    setTipo,
    saveCategoria,
    editCategoria,
    removeCategoria,
  } = useCategoriaModel();

  const [mounted, setMounted] = useState(true);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Categorias</h1>

      {/* Formulário */}
      <div className="flex gap-4 items-end mb-6">
        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as "Renda" | "Despesa")}
          className="border p-2 rounded w-1/4"
        >
          <option value="Renda">Renda</option>
          <option value="Despesa">Despesa</option>
        </select>
        <button
          onClick={saveCategoria}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
        >
          {editId !== null ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      {/* Lista de categorias */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary text-left">
            <th className="p-3">Nome</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.nome}</td>
                <td className="p-3">{c.tipo}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => editCategoria(c)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removeCategoria(c.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                Nenhuma categoria cadastrada ainda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaView;
