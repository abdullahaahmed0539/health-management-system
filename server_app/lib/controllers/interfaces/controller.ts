import { Request, Response } from "express";

export interface Controller {
  getAll(req: Request, res: Response): Promise<Response>;

  get(req: Request, res: Response): Promise<Response>;

  add(req: Request, res: Response): Promise<Response>;

  update(req: Request, res: Response): Promise<Response>;

  delete(req: Request, res: Response): Promise<Response>;
}
