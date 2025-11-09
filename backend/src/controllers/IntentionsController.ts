import { Request, Response } from "express";
import { IntentionsService } from "../services/IntentionsService";
import { handleResponse } from "../utils/responseHandler";

export class IntentionsController {
  private service = new IntentionsService();

  async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    return handleResponse(res, result);
  }

  async list(req: Request, res: Response) {
    const result = await this.service.list();
    return handleResponse(res, result);
  }

  async approve(req: Request, res: Response) {
    const result = await this.service.approve(req.params.id);
    return handleResponse(res, result);
  }

  async reject(req: Request, res: Response) {
    const result = await this.service.reject(req.params.id);
    return handleResponse(res, result);
  }
}
