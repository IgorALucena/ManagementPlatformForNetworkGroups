import { errors } from "celebrate";
import { Request, Response, NextFunction } from "express";

// Middleware global do celebrate para capturar erros de validação
export const validationErrorHandler = errors();

// Middleware genérico para capturar qualquer erro não tratado
export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ Error:", err);

  if (err.joi) {
    return res.status(400).json({
      success: false,
      message: "Erro de validação nos dados enviados",
      details: err.joi.details,
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erro interno no servidor",
  });
}
