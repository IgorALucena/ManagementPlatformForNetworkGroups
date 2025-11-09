import { Response } from "express";

export const handleResponse = (res: Response, result: any) => {
  if (result.error) {
    return res.status(result.status || 400).json({ success: false, ...result });
  }
  return res.status(result.status || 200).json({ success: true, ...result });
};
