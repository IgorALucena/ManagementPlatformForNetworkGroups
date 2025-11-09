import { api } from "../utils/api";

export interface IntentionPayload {
  full_name: string;
  email: string;
  phone?: string;
  message?: string;
}

export async function createIntention(data: IntentionPayload) {
  try {
    const response = await api.post("/intentions", data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar intenção:", error);
    throw error.response?.data || { error: "Erro desconhecido" };
  }
}

export async function fetchIntentions() {
  try {
    const response = await api.get("/intentions");
    return response.data.data;
  } catch (error: any) {
    console.error("Erro ao buscar intenções:", error);
    throw error.response?.data || { error: "Erro desconhecido" };
  }
}

export async function approveIntention(id: string) {
  try {
    const response = await api.patch(`/intentions/${id}/approve`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao aprovar intenção:", error);
    throw error.response?.data || { error: "Erro desconhecido" };
  }
}

export async function rejectIntention(id: string) {
  try {
    const response = await api.patch(`/intentions/${id}/reject`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao rejeitar intenção:", error);
    throw error.response?.data || { error: "Erro desconhecido" };
  }
}
