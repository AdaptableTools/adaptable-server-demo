import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jsonHandler from "./jsonHandler";

const prisma = new PrismaClient();

export default jsonHandler<PrismaClient["order"]>(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    { fields, limit, skip }
  ) => {
    return await prisma.order.findMany({
      select: fields,
      first: limit,
      skip,
    });
  }
);
