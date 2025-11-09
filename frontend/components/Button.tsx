interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "danger" | "success" | "link";
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled,
  variant = "primary",
}: ButtonProps) {
  const base = "px-3 py-2 rounded-md font-medium transition text-sm";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    link: "bg-transparent text-blue-600 hover:text-blue-800 underline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
