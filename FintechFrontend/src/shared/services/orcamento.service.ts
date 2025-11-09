/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/orcamento";

export async function getOrcamentos(): Promise<any> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar orçamentos");
  return res.json();
}

export async function addOrcamento(data: unknown): Promise<any> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao adicionar orçamento");
  return res.json();
}

export async function updateOrcamento(id: number, data: unknown): Promise<any> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar orçamento");
  return res.json();
}

export async function deleteOrcamento(id: number): Promise<boolean> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar orçamento");

  return true;
}
