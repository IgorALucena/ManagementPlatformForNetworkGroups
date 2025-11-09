import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createIntention } from "../../services/intentions.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";

const schema = yup.object({
  full_name: yup.string().required("Nome completo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  phone: yup
    .string()
    .optional()
    .test(
      "is-valid-phone",
      "Telefone inválido. Use o formato (XX) XXXXX-XXXX ou apenas números.",
      (value) => {
        if (!value) return true;
        const phoneDigits = value.replace(/\D/g, "");
        return phoneDigits.length >= 10 && phoneDigits.length <= 11;
      }
    ),
  message: yup.string().optional(),
});

type FormValues = yup.InferType<typeof schema>;

export default function IntentionsPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createIntention(data);
      toast.success("Intenção enviada com sucesso!");
      reset();
    } catch (err: any) {
      toast.error(err?.error || "Erro ao enviar intenção");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Envie sua intenção de participação
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nome completo
            </label>
            <input
              {...register("full_name")}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: João Silva"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              E-mail
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="exemplo@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Telefone
            </label>
            <input
              {...register("phone")}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mensagem
            </label>
            <textarea
              {...register("message")}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Por que deseja participar?"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar intenção"}
          </Button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
