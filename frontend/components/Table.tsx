import React from "react";

interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  className?: string;
  emptyMessage?: string;
}

export default function Table<T>({
  data,
  columns,
  className,
  emptyMessage = "Nenhum registro encontrado.",
}: TableProps<T>) {
  if (!data.length) {
    return (
      <p className="text-center text-gray-500 py-4 border rounded-md bg-gray-50">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className={`overflow-x-auto border border-gray-200 rounded-lg ${className}`}
    >
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 text-left font-semibold border-b"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              className={`border-b last:border-none ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2 align-top">
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
