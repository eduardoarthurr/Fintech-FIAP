import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      "next-auth.session-token=; Max-Age=0; path=/;",
      "next-auth.csrf-token=; Max-Age=0; path=/;",
    ]);

    return res.status(200).json({ message: "Sessão encerrada." });
  }

  res.status(405).json({ message: "Método não permitido." });
}
