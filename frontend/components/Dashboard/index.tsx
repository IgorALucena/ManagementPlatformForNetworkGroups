import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Users, Send, Heart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

interface DashboardData {
  totalMembers: number;
  totalIndications: number;
  totalThanks: number;
}

interface ChartData {
  mes: string;
  indicacoes: number;
  obrigados: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalMembers: 0,
    totalIndications: 0,
    totalThanks: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [periodo, setPeriodo] = useState("mes");
  const [topMembers, setTopMembers] = useState<
    { name: string; indicacoes: number }[]
  >([]);

  useEffect(() => {
    if (periodo === "mes") {
      setData({
        totalMembers: 42,
        totalIndications: 15,
        totalThanks: 7,
      });
      setChartData([
        { mes: "Jan", indicacoes: 10, obrigados: 5 },
        { mes: "Fev", indicacoes: 15, obrigados: 7 },
        { mes: "Mar", indicacoes: 18, obrigados: 9 },
        { mes: "Abr", indicacoes: 12, obrigados: 6 },
        { mes: "Mai", indicacoes: 21, obrigados: 10 },
        { mes: "Jun", indicacoes: 17, obrigados: 8 },
      ]);
      setTopMembers([
        { name: "Ana Souza", indicacoes: 12 },
        { name: "João Silva", indicacoes: 9 },
        { name: "Marcos Lima", indicacoes: 7 },
      ]);
    }

    if (periodo === "anterior") {
      setData({
        totalMembers: 40,
        totalIndications: 9,
        totalThanks: 4,
      });
      setChartData([
        { mes: "Jul", indicacoes: 5, obrigados: 2 },
        { mes: "Ago", indicacoes: 8, obrigados: 4 },
        { mes: "Set", indicacoes: 11, obrigados: 5 },
        { mes: "Out", indicacoes: 9, obrigados: 3 },
      ]);
      setTopMembers([
        { name: "Carlos Pereira", indicacoes: 6 },
        { name: "Beatriz Lima", indicacoes: 5 },
        { name: "Fernanda Alves", indicacoes: 3 },
      ]);
    }

    if (periodo === "ano") {
      setData({
        totalMembers: 52,
        totalIndications: 120,
        totalThanks: 45,
      });
      setChartData([
        { mes: "Jan", indicacoes: 12, obrigados: 4 },
        { mes: "Fev", indicacoes: 10, obrigados: 6 },
        { mes: "Mar", indicacoes: 15, obrigados: 9 },
        { mes: "Abr", indicacoes: 18, obrigados: 7 },
        { mes: "Mai", indicacoes: 20, obrigados: 10 },
        { mes: "Jun", indicacoes: 22, obrigados: 11 },
        { mes: "Jul", indicacoes: 19, obrigados: 8 },
        { mes: "Ago", indicacoes: 14, obrigados: 5 },
        { mes: "Set", indicacoes: 16, obrigados: 7 },
        { mes: "Out", indicacoes: 12, obrigados: 6 },
        { mes: "Nov", indicacoes: 10, obrigados: 5 },
        { mes: "Dez", indicacoes: 8, obrigados: 4 },
      ]);
      setTopMembers([
        { name: "Ricardo Costa", indicacoes: 40 },
        { name: "Maria Oliveira", indicacoes: 32 },
        { name: "Patrícia Santos", indicacoes: 25 },
      ]);
    }
  }, [periodo]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800 mt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Dashboard de Performance
      </motion.h1>

      <div className="mb-8">
        <select
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring focus:ring-blue-300"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="mes">Este mês</option>
          <option value="anterior">Mês anterior</option>
          <option value="ano">Ano atual</option>
        </select>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <DashboardCard
          title="Membros Ativos"
          value={data.totalMembers}
          icon={<Users />}
          color="text-blue-600"
        />
        <DashboardCard
          title="Indicações"
          value={data.totalIndications}
          icon={<Send />}
          color="text-green-600"
        />
        <DashboardCard
          title="Obrigados"
          value={data.totalThanks}
          icon={<Heart />}
          color="text-pink-600"
        />
      </motion.div>

      <motion.div
        className="w-full max-w-5xl bg-white rounded-2xl p-6 shadow mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Evolução de Indicações e Obrigados
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="indicacoes"
              stroke="#16a34a"
              strokeWidth={3}
              name="Indicações"
            />
            <Line
              type="monotone"
              dataKey="obrigados"
              stroke="#ec4899"
              strokeWidth={3}
              name="Obrigados"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="w-full max-w-5xl bg-white rounded-2xl p-6 shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {periodo === "ano"
            ? "Top 3 Membros do Ano"
            : periodo === "anterior"
            ? "Top 3 do Mês Anterior"
            : "Top 3 Membros do Mês"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topMembers.map((m, i) => (
            <div
              key={i}
              className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-all"
            >
              <p className="text-gray-800 font-bold">{m.name}</p>
              <p className="text-gray-600 text-sm">{m.indicacoes} indicações</p>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
