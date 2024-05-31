import { Request, Response } from "express";

export interface Controller {
  getAll(req: Request, res: Response): Response;

  get(req: Request, res: Response): Response;

  add(req: Request, res: Response): Response;

  update(req: Request, res: Response): Response;

  delete(req: Request, res: Response): Response;
}
