import { useEffect, useState } from "react";
import {
  fetchIntentions,
  approveIntention,
  rejectIntention,
} from "../../../services/intentions.service";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import "react-toastify/dist/ReactToastify.css";

interface Intention {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  message?: string;
  status?: "pending" | "approved" | "rejected";
  created_at: string;
  token?: string;
  used?: boolean;
}

export default function AdminIntentionsPage() {
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadIntentions = async () => {
    try {
      const data = await fetchIntentions();
      setIntentions(data);
    } catch {
      toast.error("Erro ao carregar intenções");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const response = await approveIntention(id);
      const token = response.token;

      toast.success("Intenção aprovada!");

      if (token) {
        const registerUrl = `http://localhost:3000/register/${token}`;
        toast.info("Link de cadastro gerado e enviado!");
        console.log(registerUrl);
        await navigator.clipboard.writeText(registerUrl);
      }

      await loadIntentions();
    } catch {
      toast.error("Erro ao aprovar");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectIntention(id);
      toast.warn("Intenção rejeitada!");
      await loadIntentions();
    } catch {
      toast.error("Erro ao rejeitar");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    loadIntentions();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadIntentions();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Painel de Intenções
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : (
          <Table
            data={intentions}
            emptyMessage="Nenhuma intenção cadastrada."
            columns={[
              { key: "full_name", label: "Nome" },
              { key: "email", label: "E-mail" },
              {
                key: "phone",
                label: "Telefone",
                render: (item) =>
                  item.phone ? (
                    <span
                      title={item.phone}
                      className="block max-w-xs truncate text-gray-700"
                    >
                      {item.phone}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Sem telefone</span>
                  ),
              },
              {
                key: "message",
                label: "Mensagem",
                render: (item) =>
                  item.message ? (
                    <span
                      title={item.message}
                      className="block max-w-xs truncate text-gray-700"
                    >
                      {item.message}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Sem mensagem</span>
                  ),
              },
              {
                key: "status",
                label: "Status / Ações",
                render: (item) => (
                  <div className="flex flex-col gap-1">
                    {item.status === "approved" ? (
                      <>
                        <span className="text-green-600 font-medium">
                          Aprovado ✅
                        </span>

                        {item.token && (
                          <div className="flex items-center gap-2">
                            {!item.used ? (
                              <Button
                                onClick={async () => {
                                  const registerUrl = `http://localhost:3000/register/${item.token}`;
                                  await navigator.clipboard.writeText(
                                    registerUrl
                                  );
                                  toast.success(
                                    "Link copiado para a área de transferência!"
                                  );
                                }}
                                variant="link"
                              >
                                Copiar link
                              </Button>
                            ) : (
                              <span className="text-gray-400 text-sm italic">
                                Cadastrado como membro
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    ) : item.status === "rejected" ? (
                      <span className="text-red-600 font-medium">
                        Recusado ❌
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoading === item.id}
                          variant="success"
                        >
                          {actionLoading === item.id
                            ? "Aprovando..."
                            : "Aprovar"}
                        </Button>
                        <Button
                          onClick={() => handleReject(item.id)}
                          disabled={actionLoading === item.id}
                          variant="danger"
                        >
                          {actionLoading === item.id
                            ? "Recusando..."
                            : "Recusar"}
                        </Button>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
