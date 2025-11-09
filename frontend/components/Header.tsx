import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarChart3, Shield, User } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "admin") setIsAdmin(true);
  }, []);

  const toggleMode = () => {
    const newMode = isAdmin ? "user" : "admin";
    setIsAdmin(!isAdmin);
    localStorage.setItem("mode", newMode);

    if (newMode === "admin") {
      router.push("/");
    } else {
      router.push("/intentions");
    }
  };

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      router.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-blue-600 w-6 h-6" />
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Networking System
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          {isAdmin ? (
            <>
              <Link href="/" className={linkClass("/")}>
                Dashboard
              </Link>
              <Link
                href="/admin/intentions"
                className={linkClass("/admin/intentions")}
              >
                Painel Admin
              </Link>
            </>
          ) : (
            <Link href="/intentions" className={linkClass("/intentions")}>
              Enviar intenção
            </Link>
          )}

          <button
            onClick={toggleMode}
            className={`ml-3 flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium border transition ${
              isAdmin
                ? "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {isAdmin ? (
              <>
                <Shield size={16} /> Modo Admin
              </>
            ) : (
              <>
                <User size={16} /> Modo Usuário
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
