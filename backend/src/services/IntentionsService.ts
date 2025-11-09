import { IntentionsRepository } from "../repositories/IntentionsRepository";
import { InvitesRepository } from "../repositories/InvitesRepository";
import { generateToken } from "../utils/tokenGenerator";

export class IntentionsService {
  private repo = new IntentionsRepository();
  private invites = new InvitesRepository();

  async create(data: any) {
    const intention = await this.repo.create(data);
    return {
      status: 201,
      message: "Intenção criada com sucesso",
      data: intention,
    };
  }

  async list() {
    const intentions = await this.repo.list();
    return { status: 200, data: intentions };
  }

  async approve(id: string) {
    const intention = await this.repo.findById(id);
    if (!intention) return { error: "Intention not found", status: 404 };

    const token = generateToken();
    await this.invites.create({ intention_id: id, token });
    await this.repo.updateStatus(id, "approved");

    return { message: "Intention approved", token };
  }

  async reject(id: string) {
    const found = await this.repo.findById(id);
    if (!found) return { error: "Intention not found", status: 404 };

    await this.repo.updateStatus(id, "rejected");
    return { message: "Intention rejected" };
  }
}
