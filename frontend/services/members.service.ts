import { api } from "../utils/api";

export interface MemberPayload {
  token: string;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  business_area?: string;
}

export async function registerMember(data: MemberPayload) {
  try {
    const response = await api.post("/members/register", data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);
    throw error.response?.data || { error: "Erro desconhecido" };
  }
}
