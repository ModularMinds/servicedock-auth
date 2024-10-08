import { NextFunction, Request, Response } from "express";

export const adminAuthenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization!;

    const [username, password] = Buffer.from(
      authHeader?.split(" ")[1],
      "base64"
    )
      .toString("ascii")
      .split(":");

    if (
      username !== process.env.FLEXIBASE_ADMIN_USER ||
      password !== process.env.FLEXIBASE_ADMIN_PASSWORD
    ) {
      return res.json({ isSucess: false, message: "invalid admin creds" });
    }

    next();
  } catch (err) {
    return res.json({ isSuccess: false, err });
  }
};
