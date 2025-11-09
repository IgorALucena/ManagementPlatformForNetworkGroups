import crypto from "crypto";

export const generateToken = () => crypto.randomUUID();
