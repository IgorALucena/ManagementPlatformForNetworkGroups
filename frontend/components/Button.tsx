interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "danger" | "success" | "link" | "softBlue" | "softGray";
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-1 px-3 py-1.5 rounded-md font-medium transition text-sm border text-center select-none";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
    success: "bg-green-600 hover:bg-green-700 text-white border-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white border-transparent",
    link: "bg-transparent text-blue-600 hover:text-blue-800 underline border-none",
    softBlue:
      "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 transition-colors",
    softGray:
      "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 transition-colors",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
