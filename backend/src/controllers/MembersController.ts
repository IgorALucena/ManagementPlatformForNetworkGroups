import { Request, Response } from "express";
import { MembersService } from "../services/MembersService";
import { handleResponse } from "../utils/responseHandler";

export class MembersController {
  private service = new MembersService();

  async register(req: Request, res: Response) {
    const result = await this.service.register(req.body);
    return handleResponse(res, result);
  }
}
