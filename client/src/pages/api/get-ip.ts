// pages/api/get-ip.ts

import { NextApiRequest, NextApiResponse } from "next";

const getClientIp = (req: NextApiRequest): string => {
  const forwardedFor = req.headers["x-forwarded-for"] as string | undefined;
  return forwardedFor
    ? forwardedFor.split(",")[0]
    : req.socket.remoteAddress || "";
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getClientIp(req);

  res.status(200).json({ ip });
}
