import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    // render a ui to upload a file
  } else {
    // save the data
  }

  try {
    return res.status(200).json({ status: "success" });
  } catch (err) {}
}
