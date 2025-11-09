import { MembersRepository } from "../repositories/MembersRepository";
import { InvitesRepository } from "../repositories/InvitesRepository";

interface RegisterMemberDTO {
  token: string;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  business_area?: string;
}

export class MembersService {
  private membersRepo = new MembersRepository();
  private invitesRepo = new InvitesRepository();

  async register(data: RegisterMemberDTO) {
    const { token, full_name, email, phone, company_name, business_area } =
      data;

    const invite = await this.invitesRepo.findByToken(token);

    if (!invite) {
      return { error: "Token inválido", status: 400 };
    }

    if (invite.used) {
      return { error: "Este convite já foi utilizado", status: 400 };
    }

    const member = await this.membersRepo.create({
      full_name,
      email,
      phone,
      company_name,
      business_area,
    });

    await this.invitesRepo.markUsed(token);

    return { message: "Membro cadastrado com sucesso", data: member };
  }
}
