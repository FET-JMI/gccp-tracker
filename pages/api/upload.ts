import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: "success" | "error";
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    return res.status(200).json({ status: "success" });
  } catch (err) {}
}
