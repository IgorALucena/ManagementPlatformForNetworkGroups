import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerMember } from "../../services/members.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";

const schema = yup.object({
  full_name: yup.string().required("Nome completo é obrigatório"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("E-mail inválido. Ex: usuario@dominio.com")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Formato de e-mail inválido. Ex: usuario@dominio.com"
    )
    .required("E-mail é obrigatório"),
  phone: yup
    .string()
    .optional()
    .test(
      "is-valid-phone",
      "Telefone inválido. Use o formato (XX) XXXXX-XXXX ou apenas números.",
      (value) => {
        if (!value) return true;
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 11;
      }
    ),
  company_name: yup.string().optional(),
  business_area: yup.string().optional(),
});

type FormValues = yup.InferType<typeof schema>;

export default function RegisterMemberPage() {
  const router = useRouter();
  const { token } = router.query;

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
    if (!token) {
      toast.error("Token inválido ou ausente.");
      return;
    }

    try {
      await registerMember({ token: token as string, ...data });
      toast.success("Cadastro realizado com sucesso!");
      reset();
    } catch (err: any) {
      toast.error(err?.error || "Erro ao registrar membro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cadastro de Membro
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("full_name")}
              placeholder="Nome completo"
              className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 ${
                errors.full_name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="E-mail"
              className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Telefone"
              className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("company_name")}
              placeholder="Nome da empresa"
              className="border rounded-md p-2 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              {...register("business_area")}
              placeholder="Área de atuação"
              className="border rounded-md p-2 w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Finalizar cadastro"}
          </Button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
