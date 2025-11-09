import { FC, ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color = "text-blue-500",
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all">
      <div className={`${color} text-3xl`}>{icon}</div>
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
