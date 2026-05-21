import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { BadRequestError } from "../utils/errors.js";

const formatIssues = (issues: { message: string }[]): string =>
  issues.map((issue) => issue.message).join("; ");

export const validate =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(new BadRequestError(formatIssues(result.error.issues)));
      return;
    }

    req.body = result.data;
    next();
  };

export const validateQuery =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(new BadRequestError(formatIssues(result.error.issues)));
      return;
    }

    req.query = result.data as Request["query"];
    next();
  };
