const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/categorias";

export interface Categoria {
  id?: number;
  nome: string;
  tipo: "Renda" | "Despesa";
}

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar categorias");
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("Erro ao buscar categorias", err);
    return [];
  }
}

export async function addCategoria(data: Categoria): Promise<Categoria> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao adicionar categoria");
  return res.json();
}

export async function updateCategoria(
  id: number,
  data: Categoria
): Promise<Categoria> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar categoria");
  return res.json();
}

export async function deleteCategoria(id: number): Promise<boolean> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  console.log("res", res);
  if (!res.ok) throw new Error("Erro ao deletar categoria");
  return true;
}
