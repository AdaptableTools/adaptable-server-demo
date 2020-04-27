import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

type HandlerExtraArgs = {
  fields?: {
    [key: string]: boolean;
  };
  limit?: number;
  skip?: number;
};

type HandlerFn<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  args: HandlerExtraArgs
) => Promise<any>;
export default <T>(
  fn: HandlerFn<T>
): ((req: NextApiRequest, res: NextApiResponse) => Promise<any>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    await runMiddleware(req, res, cors);

    const fieldsArray = ((req.query._fields as string) || "")
      .split(",")
      .filter(Boolean);
    const fields = fieldsArray.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    let limit: number | string = `${req.query._limit}`;
    let skip: number | string = `${req.query._skip}`;

    const args: HandlerExtraArgs = {};

    if (fieldsArray.length) {
      args.fields = fields;
    }

    if (!isNaN(limit as any)) {
      limit = Number(limit);
      args.limit = limit;
    }
    if (!isNaN(skip as any)) {
      skip = Number(skip);
      args.skip = skip;
    }

    const result = await fn(req, res, args);

    return res.end(JSON.stringify(result));
  };
};
